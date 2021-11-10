package com.github.animelist.animelist.model.userlist;

import java.util.Objects;

public class UserListItem {

    private String mediaID;

    private UserListRating rating;

    public UserListItem(String mediaID, UserListRating rating) {
        this.mediaID = mediaID;
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserListItem that = (UserListItem) o;
        return Objects.equals(mediaID, that.mediaID) && Objects.equals(rating, that.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(mediaID, rating);
    }

    public String getMediaID() {
        return mediaID;
    }

    public void setMediaID(String mediaID) {
        this.mediaID = mediaID;
    }

    public UserListRating getRating() {
        return rating;
    }

    public void setRating(UserListRating rating) {
        this.rating = rating;
    }

    public static UserListItem.Builder builder() {
        return new UserListItem.Builder();
    }

    public static class Builder {
        private String mediaID;
        private UserListRating rating;

        public Builder mediaID(String mediaID) {
            this.mediaID = mediaID;
            return this;
        }

        public Builder rating(UserListRating rating) {
            this.rating = rating;
            return this;
        }

        public UserListItem build() {
            return new UserListItem(mediaID, rating);
        }
    }
}
