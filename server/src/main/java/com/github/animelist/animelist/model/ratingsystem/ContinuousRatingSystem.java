package com.github.animelist.animelist.model.ratingsystem;

import com.github.animelist.animelist.model.userlist.UserListRating;
import com.github.animelist.animelist.model.userlist.UserListSubRating;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.Assert;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.Collections.singletonList;

@Document("ratingSystems")
public class ContinuousRatingSystem extends RatingSystem {

    private Integer offset;

    public ContinuousRatingSystem(String id, String name, ObjectId ownerId, Integer size, List<SubRating> subRatings, Integer offset) {
        super(id, name, ownerId, size, subRatings);
        this.offset = offset;
        Assert.isTrue(offset >= 0, "the offset must be equal or greater than 0");
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    @Override
    public UserListRating score(List<UserListSubRating> userListSubRatings) {
        final double internal = this.scoreInternal(userListSubRatings);

        final var decimalFormat = new DecimalFormat("0.00");
        decimalFormat.setRoundingMode(RoundingMode.HALF_UP);

        var subRatings = IntStream.range(0, userListSubRatings.size())
                .boxed().map(idx -> {
                    var userListSubRating = userListSubRatings.get(idx);

                    return UserListSubRating.builder()
                            .id(idx)
                            .displayRating(decimalFormat.format(userListSubRating.getRating() + offset))
                            .rating(userListSubRating.getRating())
                            .build();
                }).collect(Collectors.toList());

        return UserListRating.builder()
                .rating(internal)
                .displayRating(decimalFormat.format(internal + offset))
                .subRatings(subRatings)
                .build();
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

    public static ContinuousRatingSystem TEN_POINT() {
        return ContinuousRatingSystem.builder()
                .id("DEFAULT")
                .name("10-Point Continuous")
                .size(11)
                .subRatings(singletonList(
                        SubRating.builder()
                                .id(0)
                                .name("Score")
                                .weight(1f)
                                .build()
                ))
                .offset(0)
                .build();
    }
}
