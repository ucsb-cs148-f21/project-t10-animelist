package com.github.animelist.animelist.model.profilepage;

import org.springframework.util.Assert;

public class TextBlock extends Block {
    private TextBlockSettings textBlockInput;
    
    public TextBlock(Width width, BlockType type, TextBlockSettings textBlockInput) {
        super(width, type);
        this.textBlockInput = textBlockInput;
        Assert.isTrue(type == BlockType.TEXT, "block type must match class");
    }

    public TextBlockSettings getTextBlockInput() {
        return textBlockInput;
    }

    public void setTextBlockInput(TextBlockSettings textBlockInput) {
        this.textBlockInput = textBlockInput;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((textBlockInput == null) ? 0 : textBlockInput.hashCode());
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
        TextBlock other = (TextBlock) obj;
        if (textBlockInput == null) {
            if (other.textBlockInput != null)
                return false;
        } else if (!textBlockInput.equals(other.textBlockInput))
            return false;
        return true;
    }
}
