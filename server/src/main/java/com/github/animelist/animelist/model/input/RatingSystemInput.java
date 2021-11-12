package com.github.animelist.animelist.model.input;

import com.github.animelist.animelist.model.ratingsystem.SubRating;

import java.util.List;

public record RatingSystemInput(String name, int size, List<SubRating> subRatings, RatingSystemType ratingSystemType, DiscreteRatingSystemInput discreteParam, ContinuousRatingSystemInput continuousParam) {
}
