package com.github.animelist.animelist.model.profilepage;


public class UserListBlockSettings {
    private String listId;
    private Integer maxEntries;
    
    public UserListBlockSettings(String listId, Integer maxEntries) {
        this.listId = listId;
        this.maxEntries = maxEntries;
    }

    public String getListId() {
        return listId;
    }

    public void setListId(String listId) {
        this.listId = listId;
    }

    public Integer getMaxEntries() {
        return maxEntries;
    }

    public void setMaxEntries(Integer maxEntries) {
        this.maxEntries = maxEntries;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((listId == null) ? 0 : listId.hashCode());
        result = prime * result + ((maxEntries == null) ? 0 : maxEntries.hashCode());
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
        if (maxEntries == null) {
            if (other.maxEntries != null)
                return false;
        } else if (!maxEntries.equals(other.maxEntries))
            return false;
        return true;
    }
}
