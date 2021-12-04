package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.input.CreateUserListInput;
import com.github.animelist.animelist.model.input.UpdateUserListInput;
import com.github.animelist.animelist.model.input.UserListItemInput;
import com.github.animelist.animelist.model.userlist.UserList;
import com.github.animelist.animelist.model.userlist.UserListItem;
import com.github.animelist.animelist.service.UserListService;
import com.github.animelist.animelist.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

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

        return userListService.createUserList(userDetails.getId(), input);
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public UserListItem addUserListItem(@Argument("input") final UserListItemInput input) {
        final var userDetails = AuthUtil.getUserDetails();

        return userListService.addItem(userDetails.getId(), input)
                .orElseThrow(() -> new RuntimeException("Add item failed"));
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public UserListItem updateUserListItem(@Argument("input") final UserListItemInput input) {
        final var userDetails = AuthUtil.getUserDetails();

        return userListService.updateItem(userDetails.getId(), input)
                .orElseThrow(() -> new RuntimeException("Update item failed"));
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public boolean updateUserList(@Argument("input") final UpdateUserListInput input) {
        final var userDetails = AuthUtil.getUserDetails();

        return userListService.updateUserList(userDetails.getId(), input);
    }

}
