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

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
public class DiscreteRatingSystemTest {
    @Test
    void DiscreteRatingSystemBuilder_happy() {
        final var builder = DiscreteRatingSystem.builder()
                .name("test")
                .ownerId(new ObjectId())
                .size(3)
                .labels(Arrays.asList("one", "two", "three"))
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

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
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertDoesNotThrow(builder::build);
    }

    @Test
    void DiscreteRatingSystemBuilder_badLabelMatch() {
        final var builder = DiscreteRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .labels(Arrays.asList("S", "A", "B", "C", "D", "E"))
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @Test
    void DiscreteRatingSystemBuilder_badSize() {
        final var builder = DiscreteRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(1)
                .labels(singletonList("S"))
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {"", "  ", "\n", "\t", "tj\n", "  test", "test   ", "-test", "test-"})
    void DiscreteRatingSystemBuilder_badName(final String badName) {
        final var builder = DiscreteRatingSystem.builder()
                .name(badName)
                .ownerId(new ObjectId())
                .size(1)
                .labels(singletonList("S"))
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1d).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @ParameterizedTest
    @ValueSource(doubles = { 0.2d,  0.90d, 1.01d, 0.98d, 2d})
    void DiscreteRatingSystemBuilder_badWeightSum(final double badSubratingWeight) {
        final var builder = DiscreteRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(6)
                .labels(Arrays.asList("S", "A", "B", "C", "D", "E"))
                .subRatings(asList(
                        SubRating.builder().id(0).name("score").weight(badSubratingWeight).build(),
                        SubRating.builder().id(1).name("score 2").weight(badSubratingWeight).build()
                ));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @Test
    void discreteRatingSystemTenPointScore_happy() {
        var ratingSystem = DiscreteRatingSystem.TEN_POINT();
        var subRatings = singletonList(
                UserListSubRating.builder()
                        .rating(6)
                        .build()
        );

        var expected = UserListRating.builder()
                .displayRating("6")
                .rating(6)
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating("6")
                                .rating(6)
                                .build()
                ))
                .build();

        var actual = ratingSystem.score(subRatings);

        assertThat(actual, is(expected));
    }

    @Test
    void discreteRatingSystemSubRatings_happy() {
        var ratingSystem = DiscreteRatingSystem.builder()
                .id("Test")
                .name("Test")
                .size(11)
                .labels(asList("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"))
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
                .displayRating("6")
                .rating(6.25)
                .subRatings(asList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating("10")
                                .rating(10)
                                .build(),
                        UserListSubRating.builder()
                                .id(1)
                                .displayRating("5")
                                .rating(5)
                                .build()
                ))
                .build();

        var actual = ratingSystem.score(subRatings);

        assertThat(actual, is(expected));
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
    void continuousTenPointConvertToDiscreteTenPoint_happy(int internalScore) {
        var input = ContinuousRatingSystem.TEN_POINT().score(singletonList(
                UserListSubRating.builder()
                        .id(0)
                        .rating(internalScore)
                        .build()
        ));

        var expected = UserListRating.builder()
                .rating(internalScore)
                .displayRating(String.valueOf(internalScore))
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating(String.valueOf(internalScore))
                                .rating(internalScore)
                                .build()
                ))
                .build();

        var actual = DiscreteRatingSystem.TEN_POINT().convert(ContinuousRatingSystem.TEN_POINT(), input);

        assertThat(actual, is(expected));
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
    void discreteTenPointConvertToDiscreteFivePoint_happy(int internalScore) {
        var input = DiscreteRatingSystem.TEN_POINT().score(singletonList(
                UserListSubRating.builder()
                        .id(0)
                        .rating(internalScore)
                        .build()
        ));

        var fivePointRatingSystem = DiscreteRatingSystem.builder()
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
                .labels(asList("0", "1", "2", "3", "4", "5"))
                .build();

        double convertedInternalScore = (internalScore / 10d) * 5;
        String display = String.valueOf((int) Math.round(convertedInternalScore));

        var expected = UserListRating.builder()
                .rating(convertedInternalScore)
                .displayRating(display)
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating(display)
                                .rating(convertedInternalScore)
                                .build()
                ))
                .build();

        var actual = fivePointRatingSystem.convert(DiscreteRatingSystem.TEN_POINT(), input);
        assertThat(actual, is(expected));
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
    void discreteTenPointConvertToDiscreteHundredPoint_happy(int internalScore) {
        var input = DiscreteRatingSystem.TEN_POINT().score(singletonList(
                UserListSubRating.builder()
                        .id(0)
                        .rating(internalScore)
                        .build()
        ));

        var fivePointRatingSystem = DiscreteRatingSystem.builder()
                .id("Test")
                .name("100 point")
                .ownerId(new ObjectId())
                .size(101)
                .subRatings(singletonList(
                        SubRating.builder()
                                .id(0)
                                .name("Score")
                                .weight(1d)
                                .build()
                ))
                .labels(IntStream.range(0, 101).boxed().map(Object::toString).collect(Collectors.toList()))
                .build();

        double convertedInternalScore = (internalScore / 10d) * 100;
        String display = String.valueOf((int) Math.round(convertedInternalScore));

        var expected = UserListRating.builder()
                .rating(convertedInternalScore)
                .displayRating(display)
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating(display)
                                .rating(convertedInternalScore)
                                .build()
                ))
                .build();

        var actual = fivePointRatingSystem.convert(DiscreteRatingSystem.TEN_POINT(), input);
        assertThat(actual, is(expected));
    }

}
