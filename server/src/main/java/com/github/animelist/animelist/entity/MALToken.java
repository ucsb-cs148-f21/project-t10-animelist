package com.github.animelist.animelist.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document("maltokens")
public class MALToken extends DateAudit {

    @Id
    private String id;

    private Integer malId;

    private String refreshToken;

    private String accessToken;

    @DBRef
    private User user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getMalId() {
        return malId;
    }

    public void setMalId(Integer malId) {
        this.malId = malId;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        MALToken malToken = (MALToken) o;
        return Objects.equals(getId(), malToken.getId()) && Objects.equals(getMalId(), malToken.getMalId()) && Objects.equals(getRefreshToken(), malToken.getRefreshToken()) && Objects.equals(getAccessToken(), malToken.getAccessToken());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId(), getMalId(), getRefreshToken(), getAccessToken());
    }
}
