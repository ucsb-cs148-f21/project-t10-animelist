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

import graphql.schema.DataFetchingEnvironment;

@Controller
public class ProfilePageController {
    public static final int DEFAULT_USER_LIST_ENTRY_LIMIT = 5;

    private final ProfilePageService profilePageService;
    private final UserListService userListService;

    @Autowired
    public ProfilePageController(
        final ProfilePageService profilePageService,
        final UserListService userListService) {
        
        this.profilePageService = profilePageService;
        this.userListService = userListService;
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public List<List<Block>> updateProfilePageBlocks(
        @Argument final Map<String, Object> args) {
       
        //workaround to avoid unsuccessful cast from LinkedHashMap to BlockInput
        ObjectMapper mapper = new ObjectMapper();
        ProfilePageInput input = mapper.convertValue(args.get("input"), ProfilePageInput.class);

        return profilePageService.updateProfilePageBlocks(input.blocks());
    }

    @SchemaMapping(typeName="UserListBlock", field="additionalData")
    public UserListBlockAdditionalData getUserListBlockAdditionalData(UserListBlock block) {
        UserListBlockSettings settings = block.getUserListBlockInput();
        UserList list = userListService.getUserList(settings.getListId()).orElseThrow();

        int entryLimit = (settings.getMaxEntries() != null) ?
            settings.getMaxEntries() : DEFAULT_USER_LIST_ENTRY_LIMIT;
        entryLimit = Math.max(entryLimit, list.getItems().size());
        list.setItems(list.getItems().subList(0, entryLimit));

        return new UserListBlockAdditionalData(list);
    }

    @SchemaMapping(typeName="StatisticsBlock", field="additionalData")
    public StatisticsBlockAdditionalData getStatisticsBlockAdditionalData(StatisticsBlock block,
        DataFetchingEnvironment dfe) {

        User user = dfe.getRoot();
        return new StatisticsBlockAdditionalData(10, 5.0);
    }
}
