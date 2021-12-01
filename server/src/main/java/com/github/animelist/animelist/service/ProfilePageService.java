package com.github.animelist.animelist.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.model.input.profilepage.BlockInput;
import com.github.animelist.animelist.model.profilepage.Block;
import com.github.animelist.animelist.model.profilepage.SpacerBlock;
import com.github.animelist.animelist.model.profilepage.StatisticsBlock;
import com.github.animelist.animelist.model.profilepage.TextBlock;
import com.github.animelist.animelist.model.profilepage.TextBlockSettings;
import com.github.animelist.animelist.model.profilepage.UserListBlock;
import com.github.animelist.animelist.model.profilepage.UserListBlockSettings;

import static com.github.animelist.animelist.util.AuthUtil.getUserDetails;

import org.springframework.beans.factory.annotation.Autowired;

public class ProfilePageService {
    private final UserService userService;

    @Autowired
    public ProfilePageService(final UserService userService) {
        this.userService = userService;
    }

    public List<List<Block>> updateProfilePageBlocks(List<List<BlockInput>> blocks) {
        List<List<Block>> outputBlocks = blocks.stream().map(this::convertRowToFullBlocks)
            .collect(Collectors.toCollection(ArrayList::new));
        
        JwtUserDetails userDetails = getUserDetails();
        User user = userService.getUser(userDetails.getId())
            .orElseThrow(() -> new RuntimeException("Can't find user."));
        user.setProfilePageBlocks(outputBlocks);

        return outputBlocks;
    }

    private List<Block> convertRowToFullBlocks(List<BlockInput> row) {
        return row.stream().map(this::convertToFullBlock)
            .collect(Collectors.toCollection(ArrayList::new));
    }

    private Block convertToFullBlock(BlockInput blockInput) {
        switch (blockInput.type()) {
            case USER_LIST:
                return new UserListBlock(blockInput.width(), blockInput.type(),
                    new UserListBlockSettings(blockInput.userListBlockInput()));
            case TEXT:
                return new TextBlock(blockInput.width(), blockInput.type(),
                    new TextBlockSettings(blockInput.textBlockInput()));
            case STATISTICS:
                return new StatisticsBlock(blockInput.width(), blockInput.type());
            case SPACER:
                return new SpacerBlock(blockInput.width(), blockInput.type());
            default:
                // this case will never be reached since the above cases cover all
                // possible enum values, but this needs to be here to keep compiler happy
                return new SpacerBlock(blockInput.width(), blockInput.type());
        }
    }
}
