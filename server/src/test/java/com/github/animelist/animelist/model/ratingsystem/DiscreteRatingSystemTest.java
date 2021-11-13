package com.github.animelist.animelist.model.ratingsystem;


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
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
public class DiscreteRatingSystemTest {
    @Test
    void DiscreteRatingSystemBuilder_happy() {
        final var builder = DiscreteRatingSystem.builder()
                .name("Test_is_good")
                .ownerId(new ObjectId())
                .size(3)
                .labels(Arrays.asList("one", "two", "three"))
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
    @ValueSource(strings = {"", "  ", "\n", "\t", "tj\n"})
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

}
