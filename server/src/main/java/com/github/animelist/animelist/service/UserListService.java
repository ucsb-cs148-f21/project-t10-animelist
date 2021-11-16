package com.github.animelist.animelist.service;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.input.UserListEntryInput;
import com.github.animelist.animelist.model.input.UserListItemInput;
import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
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

    public Optional<UserListItem> addItem(final String ownerId, final UserListItemInput input) {
        final UserListItem userListItem = formItem(input);

        final var query = getListQuery(input.listId(), ownerId);
        query.addCriteria(where("items.mediaID").ne(input.mediaID()));

        final Update update = new Update();
        update.push("items").value(userListItem);

        return verifyOneUpdated(mongoTemplate.updateFirst(query, update, UserList.class)) ? Optional.of(userListItem) : Optional.empty();
    }

    public Optional<UserListItem> updateItem(final String ownerId, final UserListItemInput input) {
        final UserListItem userListItem = formItem(input);

        final var query = getListQuery(input.listId(), ownerId);
        query.addCriteria(where("items.mediaID").is(input.mediaID()));

        final Update update = new Update();
        update.set("items.$", userListItem);

        return verifyOneUpdated(mongoTemplate.updateFirst(query, update, UserList.class)) ? Optional.of(userListItem) : Optional.empty();
    }

    private UserListItem formItem(final UserListItemInput item) {
        final RatingSystem ratingSystem = getUserList(item.listId()).orElseThrow().getRatingSystem();
        return UserListItem.builder()
                .mediaID(item.mediaID())
                .watchStatus(item.watchStatus())
                .rating(Optional.ofNullable(item.subRatings()).map(ratingSystem::score).orElse(null))
                .build();
    }

    private Query getListQuery(final String listId, final String ownerId) {
        final Query query = new Query();
        query.addCriteria(where("_id").is(new ObjectId(listId)).and("ownerId").is(new ObjectId(ownerId)));

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
