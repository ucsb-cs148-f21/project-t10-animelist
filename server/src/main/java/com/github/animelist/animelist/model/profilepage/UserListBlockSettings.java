package com.github.animelist.animelist.model.profilepage;

import org.bson.types.ObjectId;

public class UserListBlockSettings {
    private ObjectId listId;
    private int maxEntries;
    
    public UserListBlockSettings(ObjectId listId, int maxEntries) {
        this.listId = listId;
        this.maxEntries = maxEntries;
    }

    public ObjectId getListId() {
        return listId;
    }

    public void setListId(ObjectId listId) {
        this.listId = listId;
    }

    public int getMaxEntries() {
        return maxEntries;
    }

    public void setMaxEntries(int maxEntries) {
        this.maxEntries = maxEntries;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((listId == null) ? 0 : listId.hashCode());
        result = prime * result + maxEntries;
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
        UserListBlockSettings other = (UserListBlockSettings) obj;
        if (listId == null) {
            if (other.listId != null)
                return false;
        } else if (!listId.equals(other.listId))
            return false;
        if (maxEntries != other.maxEntries)
            return false;
        return true;
    }
}
