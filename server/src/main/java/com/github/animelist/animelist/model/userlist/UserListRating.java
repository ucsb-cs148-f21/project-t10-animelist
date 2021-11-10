package com.github.animelist.animelist.model.userlist;

import java.util.List;
import java.util.Objects;

public class UserListRating {

    private Integer id;

    private String displayRating;

    private Integer rating;

    private List<UserListSubRating> subRatings;

    public UserListRating(Integer id, String displayRating, Integer rating, List<UserListSubRating> subRatings) {
        this.id = id;
        this.displayRating = displayRating;
        this.rating = rating;
        this.subRatings = subRatings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserListRating that = (UserListRating) o;
        return Objects.equals(id, that.id) && Objects.equals(displayRating, that.displayRating) && Objects.equals(rating, that.rating) && Objects.equals(subRatings, that.subRatings);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, displayRating, rating, subRatings);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDisplayRating() {
        return displayRating;
    }

    public void setDisplayRating(String displayRating) {
        this.displayRating = displayRating;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
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
        private Integer id;
        private String displayRating;
        private Integer rating;
        private List<UserListSubRating> subRatings;

        public Builder id(Integer id) {
            this.id = id;
            return this;
        }

        public Builder displayRating(String displayRating) {
            this.displayRating = displayRating;
            return this;
        }

        public Builder rating(Integer rating) {
            this.rating = rating;
            return this;
        }

        public Builder subRatings(List<UserListSubRating> subRatings) {
            this.subRatings = subRatings;
            return this;
        }

        public UserListRating build() {
            return new UserListRating(id, displayRating, rating, subRatings);
        }
    }
}
