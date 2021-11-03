package com.github.animelist.animelist.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document("ratingsystem")
public class RatingSystem {

    @Id
    private String id;

    private String name;

    private String ownerId;

    private Integer size;

    private String type;

    private List<SubRating> subRating;

    private Integer offset;

    private List<String> labels;

    public RatingSystem(String id, String name, String ownerId, Integer size, String type, List<SubRating> subRating, Integer offset, List<String> labels) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.size = size;
        this.type = type;
        this.subRating = subRating;
        this.offset = offset;
        this.labels = labels;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RatingSystem that = (RatingSystem) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(ownerId, that.ownerId) && Objects.equals(size, that.size) && Objects.equals(type, that.type) && Objects.equals(subRating, that.subRating) && Objects.equals(offset, that.offset) && Objects.equals(labels, that.labels);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, ownerId, size, type, subRating, offset, labels);
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<SubRating> getSubRating() {
        return subRating;
    }

    public void setSubRating(List<SubRating> subRating) {
        this.subRating = subRating;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }
}
