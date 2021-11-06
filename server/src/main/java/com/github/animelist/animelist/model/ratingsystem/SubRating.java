package com.github.animelist.animelist.model.ratingsystem;

import java.util.Objects;

public class SubRating {

    private Integer id;

    private String name;

    private Float weight;


    public SubRating(Integer id, String name, Float weight) {
        this.id = id;
        this.name = name;
        this.weight = weight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubRating subRating = (SubRating) o;
        return Objects.equals(id, subRating.id) && Objects.equals(name, subRating.name) && Objects.equals(weight, subRating.weight);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, weight);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public static SubRating.Builder builder() {
        return new SubRating.Builder();
    }

    public static class Builder {

        private Integer id;
        private String name;
        private Float weight;

        public Builder id(Integer id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder weight(Float weight) {
            this.weight = weight;
            return this;
        }

        public SubRating build() {
            return new SubRating(id, name, weight);
        }
    }
}
