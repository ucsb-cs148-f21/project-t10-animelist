package com.github.animelist.animelist.service;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.input.UserListEntryInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
public class UserListService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public UserListService(final MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public boolean updateUserListEntry(final String userId, final UserListEntryInput entry) {
        final Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(userId).and("userList.mediaID").is(entry.mediaID()));

        final Update update = new Update();
        update.set("userList.$.rated", entry.rated());
        update.set("userList.$.rating", entry.rating());

        return mongoTemplate.updateFirst(query, update, User.class).getMatchedCount() == 1;
    }
}
