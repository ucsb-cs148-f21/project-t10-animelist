package com.github.animelist.animelist.model.response;

import java.util.Objects;

public class RefreshTokenResponse {

    private String accessToken;

    public RefreshTokenResponse(final String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public static RefreshTokenResponse.Builder builder() {
        return new RefreshTokenResponse.Builder();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RefreshTokenResponse that = (RefreshTokenResponse) o;
        return Objects.equals(getAccessToken(), that.getAccessToken());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAccessToken());
    }

    public static class Builder {

        private String accessToken;

        public Builder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public RefreshTokenResponse build() {
            return new RefreshTokenResponse(accessToken);
        }
    }
}
