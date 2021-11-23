package com.github.animelist.animelist.service;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.ratingsystem.ContinuousRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.DiscreteRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.EmbeddedRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import com.github.animelist.animelist.model.ratingsystem.SubRating;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.Collections;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@ExtendWith(MockitoExtension.class)
public class RatingSystemServiceTest {

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private RatingSystemService ratingSystemService;

    @Test
    void createContinuousRatingSystem_happy() {
        final ContinuousRatingSystem input = ContinuousRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(1)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                .build();
        final ContinuousRatingSystem expected = ContinuousRatingSystem.builder()
                .id(new ObjectId().toString())
                .name(input.getName())
                .ownerId(input.getOwnerId())
                .size(input.getSize())
                .offset(input.getOffset())
                .subRatings(input.getSubRatings())
                .build();
        final var expectedEmbeddedRatingSystem = EmbeddedRatingSystem.builder()
                .id(new ObjectId(expected.getId()))
                .name(expected.getName())
                .build();

        when(mongoTemplate.insert(input)).thenReturn(expected);

        final RatingSystem actual = ratingSystemService.createRatingSystem(input);

        verify(mongoTemplate, times(1))
                .updateFirst(new Query().addCriteria(where("_id").is(expected.getOwnerId())), new Update().push("ratingSystems", expectedEmbeddedRatingSystem), User.class);
        assertThat(actual, is(expected));
    }

    @Test
    void createDiscreteRatingSystem_happy() {
        final DiscreteRatingSystem input = DiscreteRatingSystem.builder()
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                .labels(IntStream.range(1, 11).mapToObj(String::valueOf).collect(Collectors.toList()))
                .build();
        final DiscreteRatingSystem expected = DiscreteRatingSystem.builder()
                .id(new ObjectId().toString())
                .name(input.getName())
                .ownerId(input.getOwnerId())
                .size(input.getSize())
                .subRatings(input.getSubRatings())
                .labels(input.getLabels())
                .build();
        final var expectedEmbeddedRatingSystem = EmbeddedRatingSystem.builder()
                .id(new ObjectId(expected.getId()))
                .name(expected.getName())
                .build();

        when(mongoTemplate.insert(input)).thenReturn(expected);

        final RatingSystem actual = ratingSystemService.createRatingSystem(input);

        verify(mongoTemplate, times(1))
                .updateFirst(new Query().addCriteria(where("_id").is(expected.getOwnerId())), new Update().push("ratingSystems", expectedEmbeddedRatingSystem), User.class);
        assertThat(actual, is(expected));
    }

    @Test
    void getRatingSystem_happy() {
        final RatingSystem expected = ContinuousRatingSystem.builder()
                .id(new ObjectId().toString())
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(1)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                .build();

        when(mongoTemplate.findById(eq(new ObjectId(expected.getId())), eq(RatingSystem.class))).thenReturn(expected);

        final RatingSystem actual = ratingSystemService.getRatingSystem(expected.getId()).get();

        assertThat(actual, is(expected));
    }
}
