package com.github.animelist.animelist.controller;

import java.util.List;

import com.github.animelist.animelist.model.input.profilepage.ProfilePageInput;
import com.github.animelist.animelist.model.profilepage.Block;
import com.github.animelist.animelist.service.ProfilePageService;
import com.github.animelist.animelist.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.prepost.PreAuthorize;

public class ProfilePageController {
    private final ProfilePageService profilePageService;

    @Autowired
    public ProfilePageController(
        final ProfilePageService profilePageService) {
        
        this.profilePageService = profilePageService;
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public List<List<Block>> updateProfilePageBlocks(
        @Argument("input") final ProfilePageInput input) {

        profilePageService.setProfilePageBlocks(input.blocks());
        return profilePageService.getProfilePageBlocks();
    }
}
