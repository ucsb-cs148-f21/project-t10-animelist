package com.github.animelist.animelist.model.ratingsystem;

import com.github.animelist.animelist.model.userlist.UserListItem;
import com.github.animelist.animelist.model.userlist.UserListRating;
import com.github.animelist.animelist.model.userlist.UserListSubRating;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.Objects.nonNull;

@Document("ratingSystems")
public abstract class RatingSystem {

    @Id
    private String id;

    private String name;

    @Indexed
    private ObjectId ownerId;

    private Integer size;

    private List<SubRating> subRatings;

    private static final float WEIGHT_SUM_EPSILON = 0.01f;

    private static final float WEIGHT_SUM_EXPECTED = 1f;

    public RatingSystem(String id, String name, ObjectId ownerId, Integer size, List<SubRating> subRatings) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.size = size;
        this.subRatings = subRatings;
        Assert.isTrue(size >= 2, "Size must be at least 2");
        Assert.isTrue(subRatings.size()>=1, "subRatings size must be at least 1");
        Assert.isTrue(nonNull(name) && !name.isBlank(),"name cannot be blank");
        Assert.isTrue(name.length()>=1 && name.length()<= 50, "name must be at least one character and less than 50 characters");
        var weightSum = subRatings.stream().mapToDouble(SubRating::getWeight).sum();
        var difference = WEIGHT_SUM_EXPECTED - weightSum;
        Assert.isTrue(difference >= 0 && difference <= WEIGHT_SUM_EPSILON, "subRatings weight sum must sum up to 1");
        Assert.isTrue(name.matches("^[a-zA-Z0-9]+(?:[\\w -]*[a-zA-Z0-9]+)*$"),"Name must be AlphaNumeric");
    }

    public abstract UserListRating score(final List<UserListSubRating> userListSubRatings);

    public UserListRating convert(final RatingSystem from, final UserListRating rating) {
        final double ranking = (rating.getRating() / (from.getMaxInternalScore()));
        final double internalScore = ranking * (this.getMaxInternalScore());

        final List<UserListSubRating> newSubRatings = this.getSubRatings().stream()
                .map(subRating -> UserListSubRating.builder()
                        .rating(internalScore)
                        .build())
                .collect(Collectors.toList());

        return this.score(newSubRatings);
    }

    protected double scoreInternal(final List<UserListSubRating> userListSubRatings) {
        Assert.isTrue(userListSubRatings.size() == this.subRatings.size(), "Amount of subratings does not match");
        userListSubRatings.forEach(item -> Assert.isTrue(item.getRating() >= 0 && item.getRating() <= this.getMaxInternalScore(), "Subratings have out of range ratings"));

        // 1-to-1 mapping by the indexes instead of using ids
        return IntStream.range(0, this.subRatings.size()).boxed()
                .reduce(0d, (total, idx) -> total + this.subRatings.get(idx).getWeight() * userListSubRatings.get(idx).getRating(), Double::sum);
    }

    protected int getMaxInternalScore() {
        return this.getSize() - 1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RatingSystem)) return false;
        RatingSystem that = (RatingSystem) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getName(), that.getName()) && Objects.equals(getOwnerId(), that.getOwnerId()) && Objects.equals(getSize(), that.getSize()) && Objects.equals(getSubRatings(), that.getSubRatings());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getOwnerId(), getSize(), getSubRatings());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ObjectId getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(ObjectId ownerId) {
        this.ownerId = ownerId;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public List<SubRating> getSubRatings() {
        return subRatings;
    }

    public void setSubRatings(List<SubRating> subRatings) {
        // assign each to an id corresponding to list indexes
        IntStream.range(0, subRatings.size())
                .forEach(idx -> subRatings.get(idx).setId(idx));
        this.subRatings = subRatings;
    }

}
