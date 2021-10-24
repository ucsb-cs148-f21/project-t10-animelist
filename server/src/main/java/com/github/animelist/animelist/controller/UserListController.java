package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.model.input.UserListEntryInput;
import com.github.animelist.animelist.model.user.UserListEntry;
import com.github.animelist.animelist.service.UserListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
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
