package com.github.animelist.animelist.model.input.profilepage;

import org.bson.types.ObjectId;

public record UserListBlockInput(ObjectId listId, int maxEntries) {}
