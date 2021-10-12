package com.github.animelist.animelist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "maltokens")
public class MALToken extends DateAudit {

    @Id
    private UUID id;

    @Column(unique = true)
    private Integer malId;

    @Lob
    private String refreshToken;

    @Lob
    private String accessToken;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @PrimaryKeyJoinColumn
    @MapsId
    private User user;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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
