package com.github.animelist.animelist.model.ratingsystem;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;

import static java.util.Arrays.asList;
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
    void createContinuousRatingSystemBuilder_badOffset() {
        final var builder = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(-5)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

        assertThrows(IllegalArgumentException.class, builder::build);
    }

    @Test
    void createContinuousRatingSystemBuilder_badSize() {
        final var builder = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(-3)
                .offset(1)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

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
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()));

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

}
