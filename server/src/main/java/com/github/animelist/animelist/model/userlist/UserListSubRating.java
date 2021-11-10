package com.github.animelist.animelist.model.userlist;

import java.util.Objects;

public class UserListSubRating {

    private Integer id;

    private String displayRating;

    private Integer rating;

    public UserListSubRating(Integer id, String displayRating, Integer rating) {
        this.id = id;
        this.displayRating = displayRating;
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserListSubRating that = (UserListSubRating) o;
        return Objects.equals(id, that.id) && Objects.equals(displayRating, that.displayRating) && Objects.equals(rating, that.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, displayRating, rating);
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

    public static UserListSubRating.Builder builder() {
        return new UserListSubRating.Builder();
    }

    public static class Builder {
        private Integer id;
        private String displayRating;
        private Integer rating;

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

        public UserListSubRating build() {
            return new UserListSubRating(id, displayRating, rating);
        }
    }
}
