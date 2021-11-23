package com.github.animelist.animelist.model.userlist;

import org.bson.types.ObjectId;

import java.util.Objects;

public class EmbeddedUserList {

    private ObjectId id;
    private String name;

    public EmbeddedUserList(ObjectId id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmbeddedUserList)) return false;
        EmbeddedUserList that = (EmbeddedUserList) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getName(), that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName());
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static EmbeddedUserList.Builder builder() {
        return new EmbeddedUserList.Builder();
    }

    public static class Builder {

        private ObjectId id;
        private String name;

        public Builder id(ObjectId id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public EmbeddedUserList build() {
            return new EmbeddedUserList(id, name);
        }
    }
}
