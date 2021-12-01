package com.github.animelist.animelist.model.input.profilepage;

import com.github.animelist.animelist.model.profilepage.BlockType;
import com.github.animelist.animelist.model.profilepage.Width;

public record BlockInput(Width width, BlockType type,
    UserListBlockInput userListBlockInput,
    TextBlockInput textBlockInput) {

    public BlockInput(Width width, BlockType type) {
        this(width, type, null, null);
    }

    public BlockInput(Width width, BlockType type, UserListBlockInput userListBlockInput) {
        this(width, type, userListBlockInput, null);
    }
}