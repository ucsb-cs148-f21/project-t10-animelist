package com.github.animelist.animelist.model.profilepage;

public abstract class Block {
    private Width width;
    private BlockType type;

    public Block(Width width, BlockType type) {
        this.width = width;
        this.type = type;
    }

    public void setWidth(Width width) {
        this.width = width;
    }

    public void setType(BlockType type) {
        this.type = type;
    }

    public Width getWidth() {
        return width;
    }

    public BlockType getType() {
        return type;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((type == null) ? 0 : type.hashCode());
        result = prime * result + ((width == null) ? 0 : width.hashCode());
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
        Block other = (Block) obj;
        if (type != other.type)
            return false;
        if (width != other.width)
            return false;
        return true;
    }
}
