package com.github.animelist.animelist.service;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.input.UserListEntryInput;
import com.github.animelist.animelist.model.userlist.UserList;
import com.github.animelist.animelist.model.userlist.UserListItem;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static com.github.animelist.animelist.util.MongoUtil.verifyOneUpdated;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Component
public class UserListService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public UserListService(final MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public UserList createUserList(final UserList userList) {
        return mongoTemplate.insert(userList);
    }

    public Optional<UserList> getUserList(final String listId) {
        return Optional.ofNullable(mongoTemplate.findById(new ObjectId(listId), UserList.class));
    }

    public boolean addItem(final String listId, final String ownerId, final UserListItem item) {
        final var query = getListQuery(listId, ownerId);

        final Update update = new Update();
        update.push("items").value(item);

        return verifyOneUpdated(mongoTemplate.updateFirst(query, update, UserList.class));
    }

    public boolean updateItem(final String listId, final String ownerId, final UserListItem item) {
        final var query = getListQuery(listId, ownerId);
        query.addCriteria(where("items.mediaID").is(item.getMediaID()));

        final Update update = new Update();
        update.set("items.$", item);

        return verifyOneUpdated(mongoTemplate.updateFirst(query, update, UserList.class));
    }

    private Query getListQuery(final String listId, final String ownerId) {
        final Query query = new Query();
        query.addCriteria(where("_id").is(listId).and("ownerId").is(ownerId));

        return query;
    }

    @Deprecated
    public boolean updateUserListEntry(final String userId, final UserListEntryInput entry) {
        final Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(userId).and("userList.mediaID").is(entry.mediaID()));

        final Update update = new Update();
        update.set("userList.$.rated", entry.rated());
        update.set("userList.$.rating", entry.rating());

        return mongoTemplate.updateFirst(query, update, User.class).getMatchedCount() == 1;
    }
}
