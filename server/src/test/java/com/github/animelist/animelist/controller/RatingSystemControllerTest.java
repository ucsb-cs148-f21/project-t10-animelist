package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.model.input.ContinuousRatingSystemInput;
import com.github.animelist.animelist.model.input.DiscreteRatingSystemInput;
import com.github.animelist.animelist.model.input.RatingSystemInput;
import com.github.animelist.animelist.model.input.RatingSystemType;
import com.github.animelist.animelist.model.ratingsystem.ContinuousRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.DiscreteRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import com.github.animelist.animelist.model.ratingsystem.SubRating;
import com.github.animelist.animelist.service.RatingSystemService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.github.animelist.animelist.util.TestUtil.TEST_USERNAME;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RatingSystemControllerTest {

    private ObjectId expectedObjectID = new ObjectId();

    @Mock
    private RatingSystemService ratingSystemService;

    @InjectMocks
    private RatingSystemController ratingSystemController;

    @Test
    void getRatingSystem_happy() {
        ObjectId testID = new ObjectId();
        final RatingSystem expected = ContinuousRatingSystem.builder()
                .id(testID.toString())
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .offset(1)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                .build();

        when(ratingSystemService.getRatingSystem(testID.toString())).thenReturn(Optional.of(expected));
        final RatingSystem actual = ratingSystemController.getRatingSystem(testID.toString());
        assertThat(actual,is(expected));
    }

    @Test
    void createDiscreteRatingSystem_happy() {
        mockAuthenticationPrincipal();
        final DiscreteRatingSystemInput discreteInput = new DiscreteRatingSystemInput(Arrays.asList("one","two","three"));
        final RatingSystemInput input = new RatingSystemInput(
                "Test",
                3,
                Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()),
                RatingSystemType.DISCRETE,
                discreteInput,
                null);
        final RatingSystem expected = DiscreteRatingSystem.builder()
                .id(new ObjectId().toString())
                .name("Test")
                .ownerId(new ObjectId())
                .size(3)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                .labels(IntStream.range(1, 4).mapToObj(String::valueOf).collect(Collectors.toList()))
                .build();
        when(ratingSystemService.createRatingSystem(any())).thenReturn(expected);

        final RatingSystem actual = ratingSystemController.createRatingSystem(input);

        assertThat(actual,is(expected));
    }

    @Test
    void createContinuousRatingSystem_happy() {
        mockAuthenticationPrincipal();
        final ContinuousRatingSystemInput continuousInput = new ContinuousRatingSystemInput(1);
        final RatingSystemInput input = new RatingSystemInput("Test",10,Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()), RatingSystemType.CONTINUOUS,null,continuousInput);
        final RatingSystem expected = DiscreteRatingSystem.builder()
                .id(new ObjectId().toString())
                .name("Test")
                .ownerId(new ObjectId())
                .size(10)
                .subRatings(Collections.singletonList(SubRating.builder().id(0).name("score").weight(1f).build()))
                .labels(IntStream.range(1, 11).mapToObj(String::valueOf).collect(Collectors.toList()))
                .build();
        when(ratingSystemService.createRatingSystem(any())).thenReturn(expected);

        final RatingSystem actual = ratingSystemController.createRatingSystem(input);

        assertThat(actual,is(expected));
    }

    private void mockAuthenticationPrincipal() {
        final JwtUserDetails mockJwtUserDetails = JwtUserDetails.builder()
                .username(TEST_USERNAME)
                .id(expectedObjectID.toString())
                .build();
        final Authentication auth = mock(Authentication.class);
        when(auth.getPrincipal()).thenReturn(mockJwtUserDetails);
        final SecurityContext secCtx = mock(SecurityContext.class);
        when(secCtx.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(secCtx);
    }
}
