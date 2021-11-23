package com.github.animelist.animelist.model.ratingsystem;

import org.bson.types.ObjectId;

import java.util.Objects;

public class EmbeddedRatingSystem {

    private ObjectId id;

    private String name;

    public EmbeddedRatingSystem(ObjectId id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmbeddedRatingSystem)) return false;
        EmbeddedRatingSystem that = (EmbeddedRatingSystem) o;
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

    public static EmbeddedRatingSystem.Builder builder() {
        return new EmbeddedRatingSystem.Builder();
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

        public EmbeddedRatingSystem build() {
            return new EmbeddedRatingSystem(id, name);
        }
    }
}
