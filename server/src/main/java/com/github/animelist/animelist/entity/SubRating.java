package com.github.animelist.animelist.entity;

import java.util.Objects;

public class SubRating {

    private Integer id;

    private String name;

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

    private Float weight;
}
