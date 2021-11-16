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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Collections;

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
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

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
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

        assertDoesNotThrow(builder::build);
    }

    @Test
    void DiscreteRatingSystemBuilder_badLabelMatch() {
        final var builder = DiscreteRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .labels(Arrays.asList("S", "A", "B", "C", "D", "E"))
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @Test
    void DiscreteRatingSystemBuilder_badSize() {
        final var builder = DiscreteRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(1)
                .labels(Arrays.asList("S"))
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

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
                .labels(asList("S"))
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @ParameterizedTest
    @ValueSource(floats = { 0.2f,  0.90f, 1.01f, 0.98f, 2f})
    void DiscreteRatingSystemBuilder_badWeightSum(final float badSubratingWeight) {
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
                        .rating(5)
                        .build()
        );

        var expected = UserListRating.builder()
                .displayRating("6")
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
        var ratingSystem = DiscreteRatingSystem.builder()
                .id("Test")
                .name("Test")
                .size(10)
                .labels(asList("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"))
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
                .displayRating("6") // expected 10 * 0.25 + 5 * 0.75 = 6.25 -> 6
                .rating(5) // internally this is 5.25 -> 5 as offset is 1
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
