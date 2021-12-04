package com.github.animelist.animelist.controller;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.input.profilepage.ProfilePageInput;
import com.github.animelist.animelist.model.input.profilepage.UserListBlockInput;
import com.github.animelist.animelist.model.profilepage.Block;
import com.github.animelist.animelist.model.profilepage.StatisticsBlock;
import com.github.animelist.animelist.model.profilepage.StatisticsBlockAdditionalData;
import com.github.animelist.animelist.model.profilepage.UserListBlock;
import com.github.animelist.animelist.model.profilepage.UserListBlockAdditionalData;
import com.github.animelist.animelist.model.profilepage.UserListBlockSettings;
import com.github.animelist.animelist.model.userlist.UserList;
import com.github.animelist.animelist.service.ProfilePageService;
import com.github.animelist.animelist.service.UserListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import graphql.execution.DataFetcherResult;
import graphql.schema.DataFetchingEnvironment;

@Controller
public class ProfilePageController {
    private final ProfilePageService profilePageService;

    @Autowired
    public ProfilePageController(final ProfilePageService profilePageService) {
        this.profilePageService = profilePageService;
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public Boolean updateProfilePageBlocks(
        @Argument final Map<String, Object> args) {
       
        //workaround to avoid unsuccessful cast from LinkedHashMap to BlockInput
        ObjectMapper mapper = new ObjectMapper();
        ProfilePageInput input = mapper.convertValue(args.get("input"), ProfilePageInput.class);

        return profilePageService.updateProfilePageBlocks(input.blocks());
    }

    @SchemaMapping(typeName="UserListBlock", field="additionalData")
    public UserListBlockAdditionalData getUserListBlockAdditionalData(UserListBlock block) {
        UserList slice = profilePageService.getUserListSlice(block.getUserListBlockInput());
        return new UserListBlockAdditionalData(slice);
    }

    @SchemaMapping(typeName="StatisticsBlock", field="additionalData")
    public StatisticsBlockAdditionalData getStatisticsBlockAdditionalData(StatisticsBlock block,
        DataFetchingEnvironment dfe) {

        User user = dfe.getLocalContext();
        int entries = profilePageService.getUniqueMediaIds(user);

        // hardcode avg. rating since we probably won't use it anymore
        return new StatisticsBlockAdditionalData(entries, 5.0);
    }
}
