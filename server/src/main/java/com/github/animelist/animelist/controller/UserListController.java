package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.model.input.UserListEntryInput;
import com.github.animelist.animelist.service.RefreshTokenService;
import com.github.animelist.animelist.service.UserListService;
import com.github.animelist.animelist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletResponse;

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
    public boolean rateUserListEntry(@Argument("input") final UserListEntryInput input){

        JwtUserDetails userDetails = getUserDetails();
        return userListService.updateUserListEntry(userDetails.getId(), input);

    }
}
