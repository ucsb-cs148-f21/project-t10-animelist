package com.github.animelist.animelist.model.ratingsystem;

import com.github.animelist.animelist.model.userlist.UserListRating;
import com.github.animelist.animelist.model.userlist.UserListSubRating;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.RoundingMode;
import java.text.DecimalFormat;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
public class ContinuousRatingSystemTest {

    @Test
    void createContinuousRatingSystemBuilder_happy() {
        final var builder = ContinuousRatingSystem.builder()
                .name("test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(1)
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertDoesNotThrow(builder::build);
    }

    @ParameterizedTest
    @ValueSource(strings = { "Test", "TEST", "1234", "Test123", "Test 1234", "TEST   1234", "TEST-1234-TEST TEST" })
    void createContinuousRatingSystemBuilder_happyName(final String name) {
        final var builder = ContinuousRatingSystem.builder()
                .name(name)
                .ownerId(new ObjectId())
                .size(10)
                .offset(1)
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertDoesNotThrow(builder::build);
    }

    @Test
    void createContinuousRatingSystemBuilder_badOffset() {
        final var builder = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(-5)
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @Test
    void createContinuousRatingSystemBuilder_badSize() {
        final var builder = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(-3)
                .offset(1)
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = { "", "  ", "\n", "\t", "tj\n", "  test", "test   ", "-test", "test-" })
    void createContinuousRatingSystemBuilder_badName(final String badName) {
        final var builder = ContinuousRatingSystem.builder()
                .name(badName)
                .ownerId(new ObjectId())
                .size(10)
                .offset(1)
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @ParameterizedTest
    @ValueSource(doubles = { 0.2d,  0.90d, 1.01d, 0.98d, 2d})
    void createContinuousRatingSystemBuilder_badWeightSum(final double badSubratingWeight) {
        final var builder = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(1)
                .subRatings(asList(
                        SubRating.builder().id(0).name("score").weight(badSubratingWeight).build(),
                        SubRating.builder().id(1).name("score 2").weight(badSubratingWeight).build()
                ));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @Test
    void continuousRatingSystemTenPointScore_happy() {
        var ratingSystem = ContinuousRatingSystem.TEN_POINT();
        var subRatings = singletonList(
                UserListSubRating.builder()
                        .rating(6)
                        .build()
        );

        var expected = UserListRating.builder()
                .displayRating("6.00")
                .rating(6)
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating("6.00")
                                .rating(6)
                                .build()
                ))
                .build();

        var actual = ratingSystem.score(subRatings);

        assertThat(actual, is(expected));
    }

    @Test
    void continuousRatingSystemSubRatings_happy() {
        var ratingSystem = ContinuousRatingSystem.builder()
                .id("Test")
                .name("Test")
                .size(11)
                .offset(0)
                .subRatings(asList(
                        SubRating.builder()
                                .id(0)
                                .name("25")
                                .weight(0.25d)
                                .build(),
                        SubRating.builder()
                                .id(1)
                                .name("75")
                                .weight(0.75d)
                                .build()
                ))
                .build();

        var subRatings = asList(
                UserListSubRating.builder()
                        .rating(10)
                        .build(),
                UserListSubRating.builder()
                        .rating(5)
                        .build()
        );

        var expected = UserListRating.builder()
                .displayRating("6.25") // expected 10 * 0.25 + 5 * 0.75 = 6.25
                .rating(6.25) // internally this is 5.25 as offset is 1
                .subRatings(asList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating("10.00")
                                .rating(10)
                                .build(),
                        UserListSubRating.builder()
                                .id(1)
                                .displayRating("5.00")
                                .rating(5)
                                .build()
                ))
                .build();

        var actual = ratingSystem.score(subRatings);

        assertThat(actual, is(expected));
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
    public void discreteTenPointToContinuousTenPoint(final int internalScore) {
        var input = DiscreteRatingSystem.TEN_POINT().score(singletonList(
                UserListSubRating.builder()
                        .id(0)
                        .rating(internalScore)
                        .build()
        ));

        var expected = UserListRating.builder()
                .rating(internalScore)
                .displayRating(internalScore + ".00")
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating(internalScore + ".00")
                                .rating(internalScore)
                                .build()
                ))
                .build();

        var actual = ContinuousRatingSystem.TEN_POINT().convert(DiscreteRatingSystem.TEN_POINT(), input);

        assertThat(actual, is(expected));
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
    void discreteTenPointConvertToContinuousFivePoint_happy(int internalScore) {
        var input = DiscreteRatingSystem.TEN_POINT().score(singletonList(
                UserListSubRating.builder()
                        .id(0)
                        .rating(internalScore)
                        .build()
        ));

        var fivePointRatingSystem = ContinuousRatingSystem.builder()
                .id("Test")
                .name("Five point")
                .ownerId(new ObjectId())
                .size(6)
                .subRatings(singletonList(
                        SubRating.builder()
                                .id(0)
                                .name("Score")
                                .weight(1d)
                                .build()
                ))
                .offset(0)
                .build();

        double convertedInternalScore = (internalScore / 10d) * 5;
        final var decimalFormat = new DecimalFormat("0.00");
        decimalFormat.setRoundingMode(RoundingMode.HALF_UP);

        var expected = UserListRating.builder()
                .rating(convertedInternalScore)
                .displayRating(decimalFormat.format(convertedInternalScore))
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating(decimalFormat.format(convertedInternalScore))
                                .rating(convertedInternalScore)
                                .build()
                ))
                .build();

        var actual = fivePointRatingSystem.convert(DiscreteRatingSystem.TEN_POINT(), input);
        assertThat(actual, is(expected));
    }

    @ParameterizedTest
    @ValueSource(doubles = {0, 0.1, 0.5, 0.13, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10})
    void continuousTenPointConvertToContinuousHundredPoint_happy(final double internalScore) {
        var input = ContinuousRatingSystem.TEN_POINT().score(singletonList(
                UserListSubRating.builder()
                        .id(0)
                        .rating(internalScore)
                        .build()
        ));

        var hundredPointRatingSystem = ContinuousRatingSystem.builder()
                .id("Test")
                .name("Hundred point")
                .ownerId(new ObjectId())
                .size(101)
                .subRatings(singletonList(
                        SubRating.builder()
                                .id(0)
                                .name("Score")
                                .weight(1d)
                                .build()
                ))
                .offset(0)
                .build();

        double convertedInternalScore = (internalScore / 10d) * 100;
        final var decimalFormat = new DecimalFormat("0.00");
        decimalFormat.setRoundingMode(RoundingMode.HALF_UP);

        var expected = UserListRating.builder()
                .rating(convertedInternalScore)
                .displayRating(decimalFormat.format(convertedInternalScore))
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating(decimalFormat.format(convertedInternalScore))
                                .rating(convertedInternalScore)
                                .build()
                ))
                .build();

        var actual = hundredPointRatingSystem.convert(ContinuousRatingSystem.TEN_POINT(), input);
        assertThat(actual, is(expected));
    }

}
