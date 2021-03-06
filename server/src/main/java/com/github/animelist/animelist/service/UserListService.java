package com.github.animelist.animelist.service;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.input.CreateUserListInput;
import com.github.animelist.animelist.model.input.UpdateUserListInput;
import com.github.animelist.animelist.model.input.UserListItemInput;
import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import com.github.animelist.animelist.model.userlist.EmbeddedUserList;
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
import static java.util.Collections.emptyList;
import static java.util.Objects.isNull;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Component
public class UserListService {

    private final MongoTemplate mongoTemplate;
    private final RatingSystemService ratingSystemService;

    @Autowired
    public UserListService(final MongoTemplate mongoTemplate, final RatingSystemService ratingSystemService) {
        this.mongoTemplate = mongoTemplate;
        this.ratingSystemService = ratingSystemService;
    }

    public UserList createUserList(final String ownerId, final CreateUserListInput input) {
        final UserList userList = UserList.builder()
                .name(input.name())
                .ownerId(new ObjectId(ownerId))
                .ratingSystem(ratingSystemService.getRatingSystem(input.ratingSystemId()).orElseThrow(() -> new RuntimeException("Invalid rating system id")))
                .items(emptyList())
                .build();
        final UserList insertedList =  mongoTemplate.insert(userList);
        final EmbeddedUserList embeddedUserList = EmbeddedUserList.builder()
                .id(new ObjectId(insertedList.getId()))
                .name(insertedList.getName())
                .build();
        final Query userQuery = new Query().addCriteria(Criteria.where("_id").is(userList.getOwnerId()));
        final Update insertEmbeddedUserList = new Update().push("userLists", embeddedUserList);
        mongoTemplate.updateFirst(userQuery, insertEmbeddedUserList, User.class);

        return insertedList;
    }

    public Optional<UserList> getUserList(final String listId) {
        return Optional.ofNullable(mongoTemplate.findById(new ObjectId(listId), UserList.class))
                .map(userList -> {
                    // sorted by score nonincreasing
                    userList.getItems().sort((l, r) -> {
                        if (isNull(l) && isNull(r)) return 0;
                        if (isNull(l.getRating())) return 1;
                        if (isNull(r.getRating())) return -1;

                        return r.getRating().getRating().compareTo(l.getRating().getRating());
                    });
                    return userList;
                });
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

    public boolean updateUserList(final String ownerId, final UpdateUserListInput input) {
        final UserList userList = getUserList(input.listId()).orElseThrow();

        if (!userList.getOwnerId().toString().equals(ownerId)) {
            throw new RuntimeException("User does not own this list.");
        }

        if (userList.getName().equals(input.name()) && userList.getRatingSystem().getId().equals(input.ratingSystemId())) {
            return false;
        }

        final RatingSystem newRatingSystem = ratingSystemService.getRatingSystem(input.ratingSystemId()).orElseThrow();

        if (!input.ratingSystemId().equals(userList.getRatingSystem().getId())) {
            for (UserListItem item : userList.getItems()) {
                if (item.getRating() == null) continue;
                item.setRating(newRatingSystem.convert(userList.getRatingSystem(), item.getRating()));
            }
            userList.setRatingSystem(newRatingSystem);
        }

        if (!userList.getName().equals(input.name())) {
            userList.setName(input.name());
            final Query userQuery = new Query().addCriteria(Criteria.where("_id").is(userList.getOwnerId()).and("userLists.id").is(userList.getId()));
            final Update updateNameEmbeddedUserList = new Update().set("userLists.$.name", userList.getName());
            mongoTemplate.updateFirst(userQuery, updateNameEmbeddedUserList, User.class);
        }


        mongoTemplate.save(userList);

        return true;
    }
}
