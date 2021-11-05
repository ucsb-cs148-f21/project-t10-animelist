package com.github.animelist.animelist.model.ratingsystem;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document("ratingSystems")
public class DiscreteRatingSystem extends RatingSystem {

    private List<String> labels;

    public DiscreteRatingSystem(String id, String name, String ownerId, Integer size, List<SubRating> subRating, List<String> labels) {
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
}
