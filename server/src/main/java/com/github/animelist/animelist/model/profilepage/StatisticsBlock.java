package com.github.animelist.animelist.model.profilepage;

import org.springframework.util.Assert;

public class StatisticsBlock extends Block {
    private StatisticsBlockAdditionalData additionalData;
    
    public StatisticsBlock(Width width, BlockType type,
        StatisticsBlockAdditionalData additionalData) {

        super(width, type);
        this.additionalData = additionalData;
        Assert.isTrue(type == BlockType.STATISTICS, "block type must match class");
    }

    public StatisticsBlock(Width width, BlockType type) {
        this(width, type, null);
    }

    public StatisticsBlockAdditionalData getAdditionalData() {
        return additionalData;
    }

    public void setAdditionalData(StatisticsBlockAdditionalData additionalData) {
        this.additionalData = additionalData;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((additionalData == null) ? 0 : additionalData.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        StatisticsBlock other = (StatisticsBlock) obj;
        if (additionalData == null) {
            if (other.additionalData != null)
                return false;
        } else if (!additionalData.equals(other.additionalData))
            return false;
        return true;
    }
}
