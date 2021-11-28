package com.github.animelist.animelist.model.profilepage;

public class StatisticsBlockAdditionalData {
    private int entries;
    private Double avgRating;

    public StatisticsBlockAdditionalData(int entries, Double avgRating) {
        this.entries = entries;
        this.avgRating = avgRating;
    }

    public int getEntries() {
        return entries;
    }

    public void setEntries(int entries) {
        this.entries = entries;
    }

    public Double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(Double avgRating) {
        this.avgRating = avgRating;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((avgRating == null) ? 0 : avgRating.hashCode());
        result = prime * result + entries;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        StatisticsBlockAdditionalData other = (StatisticsBlockAdditionalData) obj;
        if (avgRating == null) {
            if (other.avgRating != null)
                return false;
        } else if (!avgRating.equals(other.avgRating))
            return false;
        if (entries != other.entries)
            return false;
        return true;
    }
}
