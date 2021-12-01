package com.github.animelist.animelist.controller;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.animelist.animelist.model.input.profilepage.BlockInput;
import com.github.animelist.animelist.model.input.profilepage.ProfilePageInput;
import com.github.animelist.animelist.model.profilepage.Block;
import com.github.animelist.animelist.service.ProfilePageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
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
        @Argument final Map<String, Object> args) {
       
        ObjectMapper mapper = new ObjectMapper();
        ProfilePageInput input = mapper.convertValue(args.get("input"), ProfilePageInput.class);

        return profilePageService.updateProfilePageBlocks(input.blocks());
    }
}
