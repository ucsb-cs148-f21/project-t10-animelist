package com.github.animelist.animelist.model.user;

import java.util.Objects;

/**
 * Represents a single entry in a user's anime list.
 * If the user has given a rating for this entry, the rated field is true
 * and the rating stored in the rating field. Otherwise, the rated field is
 * false and the value of the rating field is meaningless.
 */
public class UserListEntry {

    private int mediaID;
    private boolean rated;
    private double rating;

    public UserListEntry(final int mediaID, final boolean rated, final double rating) {
        this.mediaID = mediaID;
        this.rated = rated;
        this.rating = rating;
    }

    public int getMediaID() {
        return mediaID;
    }

    public void setMediaID(int mediaID) {
        this.mediaID = mediaID;
    }

    public boolean isRated() {
        return rated;
    }

    public void setRated(boolean rated) {
        this.rated = rated;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserListEntry that = (UserListEntry) o;
        return getMediaID() == that.getMediaID() && isRated() == that.isRated() && Double.compare(that.getRating(), getRating()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMediaID(), isRated(), getRating());
    }
}