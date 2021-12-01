package com.github.animelist.animelist.model.profilepage;

import org.springframework.util.Assert;

public class UserListBlock extends Block {
    private UserListBlockSettings userListBlockInput;
    private UserListBlockAdditionalData additionalData;
    
    public UserListBlock(Width width, BlockType type,
        UserListBlockSettings userListBlockInput,
        UserListBlockAdditionalData additionalData) {

        super(width, type);
        this.userListBlockInput = userListBlockInput;
        this.additionalData = additionalData;

        Assert.isTrue(type == BlockType.USER_LIST, "block type must match class");
    }

    public UserListBlock(Width width, BlockType type,
        UserListBlockSettings userListBlockInput) {
        
        this(width, type, userListBlockInput, null);
    }

    public UserListBlockSettings getUserListBlockInput() {
        return userListBlockInput;
    }

    public void setUserListBlockInput(UserListBlockSettings userListBlockInput) {
        this.userListBlockInput = userListBlockInput;
    }

    public UserListBlockAdditionalData getAdditionalData() {
        return additionalData;
    }

    public void setAdditionalData(UserListBlockAdditionalData additionalData) {
        this.additionalData = additionalData;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((additionalData == null) ? 0 : additionalData.hashCode());
        result = prime * result + ((userListBlockInput == null) ? 0 : userListBlockInput.hashCode());
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
        UserListBlock other = (UserListBlock) obj;
        if (additionalData == null) {
            if (other.additionalData != null)
                return false;
        } else if (!additionalData.equals(other.additionalData))
            return false;
        if (userListBlockInput == null) {
            if (other.userListBlockInput != null)
                return false;
        } else if (!userListBlockInput.equals(other.userListBlockInput))
            return false;
        return true;
    }
}
