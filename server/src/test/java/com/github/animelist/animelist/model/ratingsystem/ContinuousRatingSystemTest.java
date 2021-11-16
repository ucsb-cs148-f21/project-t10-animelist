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
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

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
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

        assertDoesNotThrow(builder::build);
    }

    @Test
    void createContinuousRatingSystemBuilder_badOffset() {
        final var builder = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(-5)
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @Test
    void createContinuousRatingSystemBuilder_badSize() {
        final var builder = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(-3)
                .offset(1)
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

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
                .subRatings(singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @ParameterizedTest
    @ValueSource(floats = { 0.2f,  0.90f, 1.01f, 0.98f, 2f})
    void createContinuousRatingSystemBuilder_badWeightSum(final float badSubratingWeight) {
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
                        .rating(5)
                        .build()
        );

        var expected = UserListRating.builder()
                .displayRating("6.00")
                .rating(5)
                .subRatings(singletonList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating("6")
                                .rating(5)
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
                .size(10)
                .offset(1)
                .subRatings(asList(
                        SubRating.builder()
                                .id(0)
                                .name("25")
                                .weight(0.25f)
                                .build(),
                        SubRating.builder()
                                .id(1)
                                .name("75")
                                .weight(0.75f)
                                .build()
                ))
                .build();

        var subRatings = asList(
                UserListSubRating.builder()
                        .rating(9) // represents a "10" as offset is 1
                        .build(),
                UserListSubRating.builder()
                        .rating(4) // represents a "5" as offset is 1
                        .build()
        );

        var expected = UserListRating.builder()
                .displayRating("6.25") // expected 10 * 0.25 + 5 * 0.75 = 6.25
                .rating(5.25) // internally this is 5.25 as offset is 1
                .subRatings(asList(
                        UserListSubRating.builder()
                                .id(0)
                                .displayRating("10")
                                .rating(9)
                                .build(),
                        UserListSubRating.builder()
                                .id(1)
                                .displayRating("5")
                                .rating(4)
                                .build()
                ))
                .build();

        var actual = ratingSystem.score(subRatings);

        assertThat(actual, is(expected));
    }

}
