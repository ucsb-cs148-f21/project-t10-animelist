package com.github.animelist.animelist.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;
import java.util.UUID;

@Document("users")
public class User extends DateAudit {

    @Id
    private String id;

    private String username;

    private String email;

    private String password;

    private int tokenVersion = 1;

    public User(
            final String id,
            final String username,
            final String email,
            final String password
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User() {
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public int getTokenVersion() {
        return tokenVersion;
    }

    public void setTokenVersion(int tokenVersion) {
        this.tokenVersion = tokenVersion;
    }

    @Override
    public String toString() {
        return "User{" +
                "createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", tokenVersion=" + tokenVersion +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return getTokenVersion() == user.getTokenVersion() && Objects.equals(getId(), user.getId()) && Objects.equals(getUsername(), user.getUsername()) && Objects.equals(getEmail(), user.getEmail()) && Objects.equals(getPassword(), user.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId(), getUsername(), getEmail(), getPassword(), getTokenVersion());
    }

    public static User.Builder builder() {
        return new User.Builder();
    }

    public static final class Builder {

        private String id;
        private String username;
        private String email;
        private String password;

        public Builder id(final String id) {
            this.id = id;
            return this;
        }

        public Builder username(final String username) {
            this.username = username;
            return this;
        }

        public Builder email(final String email) {
            this.email = email;
            return this;
        }

        public Builder password(final String password) {
            this.password = password;
            return this;
        }

        public User build() {
            return new User(id, username, email, password);
        }
    }
}
