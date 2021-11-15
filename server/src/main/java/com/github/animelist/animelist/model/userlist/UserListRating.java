package com.github.animelist.animelist.model.userlist;

import java.util.List;
import java.util.Objects;

public class UserListRating {

    private String displayRating;

    private Double rating;

    private List<UserListSubRating> subRatings;

    public UserListRating(String displayRating, Double rating, List<UserListSubRating> subRatings) {
        this.displayRating = displayRating;
        this.rating = rating;
        this.subRatings = subRatings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserListRating that = (UserListRating) o;
        return Objects.equals(displayRating, that.displayRating) && Objects.equals(rating, that.rating) && Objects.equals(subRatings, that.subRatings);
    }

    @Override
    public int hashCode() {
        return Objects.hash(displayRating, rating, subRatings);
    }

    public String getDisplayRating() {
        return displayRating;
    }

    public void setDisplayRating(String displayRating) {
        this.displayRating = displayRating;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public List<UserListSubRating> getSubRatings() {
        return subRatings;
    }

    public void setSubRatings(List<UserListSubRating> subRatings) {
        this.subRatings = subRatings;
    }

    public static UserListRating.Builder builder() {
        return new UserListRating.Builder();
    }

    public static class Builder {
        private String displayRating;
        private Double rating;
        private List<UserListSubRating> subRatings;

        public Builder displayRating(String displayRating) {
            this.displayRating = displayRating;
            return this;
        }

        public Builder rating(double rating) {
            this.rating = rating;
            return this;
        }

        public Builder subRatings(List<UserListSubRating> subRatings) {
            this.subRatings = subRatings;
            return this;
        }

        public UserListRating build() {
            return new UserListRating(displayRating, rating, subRatings);
        }
    }
}
