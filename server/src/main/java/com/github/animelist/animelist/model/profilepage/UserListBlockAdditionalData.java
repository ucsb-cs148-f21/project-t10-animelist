package com.github.animelist.animelist.model.profilepage;

import com.github.animelist.animelist.model.userlist.UserList;

public class UserListBlockAdditionalData {
    private UserList userList;

    public UserListBlockAdditionalData(UserList userList) {
        this.userList = userList;
    }

    public UserList getUserList() {
        return userList;
    }

    public void setUserList(UserList userList) {
        this.userList = userList;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((userList == null) ? 0 : userList.hashCode());
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
        UserListBlockAdditionalData other = (UserListBlockAdditionalData) obj;
        if (userList == null) {
            if (other.userList != null)
                return false;
        } else if (!userList.equals(other.userList))
            return false;
        return true;
    }
}
