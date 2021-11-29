package com.github.animelist.animelist.model.profilepage;

import org.springframework.util.Assert;

public class SpacerBlock extends Block {
    public SpacerBlock(Width width, BlockType type) {
        super(width, type);
        Assert.isTrue(type == BlockType.SPACER, "block type must match class");
    } 
}
