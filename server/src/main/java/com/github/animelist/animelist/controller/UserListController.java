package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.model.input.CreateUserListInput;
import com.github.animelist.animelist.model.input.UserListEntryInput;
import com.github.animelist.animelist.model.input.UserListItemInput;
import com.github.animelist.animelist.model.ratingsystem.ContinuousRatingSystem;
import com.github.animelist.animelist.model.user.UserListEntry;
import com.github.animelist.animelist.model.userlist.UserList;
import com.github.animelist.animelist.model.userlist.UserListItem;
import com.github.animelist.animelist.model.userlist.UserListRating;
import com.github.animelist.animelist.model.userlist.WatchStatus;
import com.github.animelist.animelist.service.UserListService;
import com.github.animelist.animelist.util.AuthUtil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import static com.github.animelist.animelist.util.AuthUtil.getUserDetails;

@Controller
public class UserListController {

    private final UserListService userListService;

    @Autowired
    public UserListController(
            final UserListService userListService) {
        this.userListService = userListService;
    }

    @QueryMapping
    public UserList userList(@Argument("listId") final String listId) {
        return userListService.getUserList(listId).orElseThrow();
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public UserList createUserList(@Argument("input") final CreateUserListInput input) {
        final var userDetails = AuthUtil.getUserDetails();
        final var userList = UserList.builder()
                .name(input.name())
                .ownerId(new ObjectId(userDetails.getId()))
                .ratingSystem(ContinuousRatingSystem.TEN_POINT)
                .build();

        return userListService.createUserList(userList);
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public UserListItem addUserListItem(@Argument("input") final UserListItemInput input) {
        final var userDetails = AuthUtil.getUserDetails();

        // TODO: Put scoring algorithm to get correct UserListRating
        final var userListItem = UserListItem.builder()
                .mediaID(input.mediaID())
                .watchStatus(input.watchStatus())
                .rating(UserListRating.builder()
                        .rating(0)
                        .displayRating("STUB")
                        .subRatings(input.subRatings())
                        .build())
                .build();

        if (!userListService.addItem(input.listId(), userDetails.getId(), userListItem)) {
            throw new RuntimeException("Failed to add item. Item might already exist");
        }

        return userListItem;
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public UserListItem updateUserListItem(@Argument("input") final UserListItemInput input) {
        final var userDetails = AuthUtil.getUserDetails();

        // TODO: Put scoring algorithm to get correct UserListRating
        final var userListItem = UserListItem.builder()
                .mediaID(input.mediaID())
                .watchStatus(input.watchStatus())
                .rating(UserListRating.builder()
                        .rating(0)
                        .displayRating("STUB")
                        .subRatings(input.subRatings())
                        .build())
                .build();

        if (!userListService.updateItem(input.listId(), userDetails.getId(), userListItem)) {
            throw new RuntimeException("Failed to update item");
        }

        return userListItem;
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public UserListEntry updateUserListEntry(@Argument("input") final UserListEntryInput input){
        JwtUserDetails userDetails = getUserDetails();

        boolean succeeded = userListService.updateUserListEntry(userDetails.getId(), input);

        if (!succeeded) {
            throw new RuntimeException("Failed to update user list entry or it may not exist");
        }

        return new UserListEntry(input.mediaID(), input.rated(), input.rating());
    }
}
