package com.github.animelist.animelist.controller;
import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.model.input.RatingSystemInput;
import com.github.animelist.animelist.model.input.RatingSystemType;
import com.github.animelist.animelist.model.ratingsystem.ContinuousRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.DiscreteRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import com.github.animelist.animelist.model.ratingsystem.SubRating;
import com.github.animelist.animelist.service.RatingSystemService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.Collections;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.github.animelist.animelist.util.AuthUtil.getUserDetails;

@Controller
public class RatingSystemController {
    private final RatingSystemService ratingSystemService;

    @Autowired
    public RatingSystemController(
            final RatingSystemService ratingSystemService) {
        this.ratingSystemService = ratingSystemService;
    }
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public RatingSystem getRatingSystem(@Argument("ratingSystemID") final String ratingSystemID){
        return ratingSystemService.getRatingSystem(ratingSystemID).orElseThrow();
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public RatingSystem createRatingSystem(@Argument("input") final RatingSystemInput input){
        JwtUserDetails userDetails = getUserDetails();

        final RatingSystem ratingSystem;
        if (input.ratingSystemType() == RatingSystemType.DISCRETE) {
            ratingSystem = DiscreteRatingSystem.builder()
                    .name(input.name())
                    .ownerId(new ObjectId(userDetails.getId()))
                    .size(input.size())
                    .subRatings(input.subRatings())
                    .labels(input.discreteParam().labels())
                    .build();
        } else {
            ratingSystem = ContinuousRatingSystem.builder()
                    .name(input.name())
                    .ownerId(new ObjectId(userDetails.getId()))
                    .size(input.size())
                    .offset(input.continuousParam().offset())
                    .subRatings(input.subRatings())
                    .build();
        }
        return ratingSystemService.createRatingSystem(ratingSystem);
    }
}
