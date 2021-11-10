package com.github.animelist.animelist.model.userlist;

import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document("userLists")
public class UserList {

    @Id
    private String id;

    private ObjectId ownerId;

    private String name;

    private RatingSystem ratingSystem;

    private List<UserListItem> items;

    public UserList(String id, ObjectId ownerId, String name, RatingSystem ratingSystem, List<UserListItem> items) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.ratingSystem = ratingSystem;
        this.items = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserList userList = (UserList) o;
        return Objects.equals(id, userList.id) && Objects.equals(ownerId, userList.ownerId) && Objects.equals(name, userList.name) && Objects.equals(ratingSystem, userList.ratingSystem) && Objects.equals(items, userList.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ownerId, name, ratingSystem, items);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ObjectId getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(ObjectId ownerId) {
        this.ownerId = ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RatingSystem getRatingSystem() {
        return ratingSystem;
    }

    public void setRatingSystem(RatingSystem ratingSystem) {
        this.ratingSystem = ratingSystem;
    }

    public List<UserListItem> getItems() {
        return items;
    }

    public void setItems(List<UserListItem> items) {
        this.items = items;
    }

    public static UserList.Builder builder() {
        return new UserList.Builder();
    }

    public static class Builder {
        private String id;
        private ObjectId ownerId;
        private String name;
        private RatingSystem ratingSystem;
        private List<UserListItem> items;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder ownerId(ObjectId ownerId) {
            this.ownerId = ownerId;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder ratingSystem(RatingSystem ratingSystem) {
            this.ratingSystem = ratingSystem;
            return this;
        }

        public Builder items(List<UserListItem> items) {
            this.items = items;
            return this;
        }

        public UserList build() {
            return new UserList(id, ownerId, name, ratingSystem, items);
        }
    }
}
