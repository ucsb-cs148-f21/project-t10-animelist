package com.github.animelist.animelist.model.userlist;

import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("userLists")
public class UserList {

    @Id
    private String id;

    private String ownerId;

    private String name;

    private RatingSystem ratingSystem;

    private List<UserListItem> items;
}
