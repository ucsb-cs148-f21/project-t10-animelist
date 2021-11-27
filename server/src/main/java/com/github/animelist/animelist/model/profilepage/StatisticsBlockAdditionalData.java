package com.github.animelist.animelist.model.profilepage;

public class StatisticsBlockAdditionalData {
    private int entries;
    private float avgRating;

    public StatisticsBlockAdditionalData(int entries, float avgRating) {
        this.entries = entries;
        this.avgRating = avgRating;
    }

    public int getEntries() {
        return entries;
    }

    public void setEntries(int entries) {
        this.entries = entries;
    }

    public float getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(float avgRating) {
        this.avgRating = avgRating;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + Float.floatToIntBits(avgRating);
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
        if (Float.floatToIntBits(avgRating) != Float.floatToIntBits(other.avgRating))
            return false;
        if (entries != other.entries)
            return false;
        return true;
    }
}
