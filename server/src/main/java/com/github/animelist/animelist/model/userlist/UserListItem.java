package com.github.animelist.animelist.model.userlist;

import java.util.Objects;

public class UserListItem {

    private Integer mediaID;

    private WatchStatus watchStatus;

    private UserListRating rating;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserListItem)) return false;
        UserListItem that = (UserListItem) o;
        return Objects.equals(getMediaID(), that.getMediaID()) && getWatchStatus() == that.getWatchStatus() && Objects.equals(getRating(), that.getRating());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMediaID(), getWatchStatus(), getRating());
    }

    public UserListItem(Integer mediaID, WatchStatus watchStatus, UserListRating rating) {
        this.mediaID = mediaID;
        this.watchStatus = watchStatus;
        this.rating = rating;
    }

    public Integer getMediaID() {
        return mediaID;
    }

    public void setMediaID(Integer mediaID) {
        this.mediaID = mediaID;
    }

    public UserListRating getRating() {
        return rating;
    }

    public void setRating(UserListRating rating) {
        this.rating = rating;
    }

    public WatchStatus getWatchStatus() {
        return watchStatus;
    }

    public void setWatchStatus(WatchStatus watchStatus) {
        this.watchStatus = watchStatus;
    }

    public static UserListItem.Builder builder() {
        return new UserListItem.Builder();
    }

    public static class Builder {
        private Integer mediaID;
        private WatchStatus watchStatus;
        private UserListRating rating;

        public Builder mediaID(Integer mediaID) {
            this.mediaID = mediaID;
            return this;
        }

        public Builder watchStatus(WatchStatus watchStatus) {
            this.watchStatus = watchStatus;
            return this;
        }

        public Builder rating(UserListRating rating) {
            this.rating = rating;
            return this;
        }

        public UserListItem build() {
            return new UserListItem(mediaID, watchStatus, rating);
        }
    }
}
