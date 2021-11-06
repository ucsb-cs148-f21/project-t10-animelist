package com.github.animelist.animelist.model.ratingsystem;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document("ratingSystems")
public abstract class RatingSystem {

    @Id
    private String id;

    private String name;

    @Indexed
    private String ownerId;

    private Integer size;

    private List<SubRating> subRatings;

    public RatingSystem(String id, String name, String ownerId, Integer size, List<SubRating> subRatings) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.size = size;
        this.subRatings = subRatings;
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

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
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
        this.subRatings = subRatings;
    }

}
