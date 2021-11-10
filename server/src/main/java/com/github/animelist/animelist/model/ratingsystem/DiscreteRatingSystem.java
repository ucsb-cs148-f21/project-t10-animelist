package com.github.animelist.animelist.model.ratingsystem;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document("ratingSystems")
public class DiscreteRatingSystem extends RatingSystem {

    private List<String> labels;

    public DiscreteRatingSystem(String id, String name, ObjectId ownerId, Integer size, List<SubRating> subRating, List<String> labels) {
        super(id, name, ownerId, size, subRating);
        this.labels = labels;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DiscreteRatingSystem)) return false;
        if (!super.equals(o)) return false;
        DiscreteRatingSystem that = (DiscreteRatingSystem) o;
        return Objects.equals(getLabels(), that.getLabels());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getLabels());
    }

    public static DiscreteRatingSystem.Builder builder() {
        return new DiscreteRatingSystem.Builder();
    }

    public static class Builder {

        private String id;
        private String name;
        private ObjectId ownerId;
        private Integer size;
        private List<SubRating> subRatings;
        private List<String> labels;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder ownerId(ObjectId ownerId) {
            this.ownerId = ownerId;
            return this;
        }

        public Builder size(Integer size) {
            this.size = size;
            return this;
        }

        public Builder subRatings(List<SubRating> subRatings) {
            this.subRatings = subRatings;
            return this;
        }

        public Builder labels(List<String> labels) {
            this.labels = labels;
            return this;
        }

        public DiscreteRatingSystem build() {
            return new DiscreteRatingSystem(id, name, ownerId, size, subRatings, labels);
        }
    }
}
