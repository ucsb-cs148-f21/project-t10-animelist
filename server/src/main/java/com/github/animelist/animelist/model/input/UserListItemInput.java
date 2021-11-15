package com.github.animelist.animelist.model.input;

import com.github.animelist.animelist.model.userlist.UserListSubRating;
import com.github.animelist.animelist.model.userlist.WatchStatus;

import java.util.List;

public record UserListItemInput(String listId, Integer mediaID, WatchStatus watchStatus, List<UserListSubRating> subRatings) {
}
