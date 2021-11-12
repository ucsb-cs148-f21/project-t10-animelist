package com.github.animelist.animelist.model.input;

import com.github.animelist.animelist.model.ratingsystem.SubRating;

import java.util.List;

public class RatingSystemInput {
    public String name;
    public int size;
    public List<SubRating> subRatings;
    public RatingSystemType ratingSystemType;
    public DiscreteRatingSystemInput discreteParam;
    public ContinuousRatingSystemInput continuousParam;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<SubRating> getSubRatings() {
        return subRatings;
    }

    public void setSubRatings(List<SubRating> subRatings) {
        this.subRatings = subRatings;
    }

    public RatingSystemType getRatingSystemType() {
        return ratingSystemType;
    }

    public void setRatingSystemType(RatingSystemType ratingSystemType) {
        this.ratingSystemType = ratingSystemType;
    }

    public DiscreteRatingSystemInput getDiscreteParam() {
        return discreteParam;
    }

    public void setDiscreteParam(DiscreteRatingSystemInput discreteParam) {
        this.discreteParam = discreteParam;
    }

    public ContinuousRatingSystemInput getContinuousParam() {
        return continuousParam;
    }

    public void setContinuousParam(ContinuousRatingSystemInput continuousParam) {
        this.continuousParam = continuousParam;
    }
}
