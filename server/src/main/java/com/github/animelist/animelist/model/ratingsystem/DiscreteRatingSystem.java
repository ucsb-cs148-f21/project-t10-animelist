package com.github.animelist.animelist.model.ratingsystem;

import com.github.animelist.animelist.model.userlist.UserListRating;
import com.github.animelist.animelist.model.userlist.UserListSubRating;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.Objects.nonNull;

@Document("ratingSystems")
public class DiscreteRatingSystem extends RatingSystem {

    private List<String> labels;

    public DiscreteRatingSystem(String id, String name, ObjectId ownerId, Integer size, List<SubRating> subRating, List<String> labels) {
        super(id, name, ownerId, size, subRating);
        this.labels = labels;
        Assert.isTrue(labels.size() == size, "the number of labels should be equal to size" );
        var nonNullNonBlankLabelsSize = labels.stream().filter(label -> nonNull(label) && !label.isBlank()).count();
        Assert.isTrue(nonNullNonBlankLabelsSize == labels. size(), "All labels should be non null and non blank");
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    @Override
    public UserListRating score(List<UserListSubRating> userListSubRatings) {
        final double internal = this.scoreInternal(userListSubRatings);
        int discreteInternalScore = (int) Math.round(internal);
        final String label = labels.get(discreteInternalScore);

        var subRatings = IntStream.range(0, userListSubRatings.size())
                .boxed().map(idx -> {
                    var userListSubRating = userListSubRatings.get(idx);

                    return UserListSubRating.builder()
                            .id(idx)
                            .displayRating(labels.get(userListSubRating.getRating()))
                            .rating(userListSubRating.getRating())
                            .build();
                }).collect(Collectors.toList());

        return UserListRating.builder()
                .rating(internal)
                .displayRating(label)
                .subRatings(subRatings)
                .build();
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
