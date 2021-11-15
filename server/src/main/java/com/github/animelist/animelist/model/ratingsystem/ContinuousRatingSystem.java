package com.github.animelist.animelist.model.ratingsystem;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

import static java.util.Collections.singletonList;

@Document("ratingSystems")
public class ContinuousRatingSystem extends RatingSystem {

    private Integer offset;

    public ContinuousRatingSystem(String id, String name, ObjectId ownerId, Integer size, List<SubRating> subRatings, Integer offset) {
        super(id, name, ownerId, size, subRatings);
        this.offset = offset;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ContinuousRatingSystem)) return false;
        if (!super.equals(o)) return false;
        ContinuousRatingSystem that = (ContinuousRatingSystem) o;
        return Objects.equals(getOffset(), that.getOffset());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getOffset());
    }

    public static ContinuousRatingSystem.Builder builder() {
        return new ContinuousRatingSystem.Builder();
    }

    public static class Builder {

        private String id;
        private String name;
        private ObjectId ownerId;
        private Integer size;
        private List<SubRating> subRatings;
        private Integer offset;

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

        public Builder offset(Integer offset) {
            this.offset = offset;
            return this;
        }

        public ContinuousRatingSystem build() {
            return new ContinuousRatingSystem(id, name, ownerId, size, subRatings, offset);
        }
    }

    public static final ContinuousRatingSystem TEN_POINT = ContinuousRatingSystem.builder()
            .id("DEFAULT")
            .name("10-Point Continuous")
            .size(10)
            .subRatings(singletonList(
                    SubRating.builder()
                            .id(0)
                            .name("Score")
                            .weight(1f)
                            .build()
            ))
            .offset(1)
            .build();
}
