package com.github.animelist.animelist.model.user;

/**
 * Represents a single entry in a user's anime list.
 * If the user has given a rating for this entry, the rated field is true
 * and the rating stored in the rating field. Otherwise, the rated field is
 * false and the value of the rating field is meaningless.
 */
public record UserListEntry(int mediaID, boolean rated, double rating) {}