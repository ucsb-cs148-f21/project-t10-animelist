package com.github.animelist.animelist.model.input;

import com.github.animelist.animelist.model.userlist.UserListRating;

public record UserListItemInput(String listId, Integer mediaID, String watchStatus, UserListRating rating) {
}
