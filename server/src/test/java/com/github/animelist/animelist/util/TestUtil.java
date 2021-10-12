package com.github.animelist.animelist.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.github.animelist.animelist.entity.User;

import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

public final class TestUtil {

    public static final UUID TEST_ID = UUID.randomUUID();
    public static final String TEST_USERNAME = "testUsername";
    public static final String TEST_EMAIL = "testEmail";
    public static final String TEST_PASSWORD = "testPassword";
    public static final int TEST_TOKEN_VERSION = 1;
    public static final String TEST_ISSUER = "testIssuer";
    public static final Algorithm TEST_REFRESH_TOKEN_ALGO = Algorithm.HMAC512("secretRefreshToken");
    public static final Algorithm TEST_ACCESS_TOKEN_ALGO = Algorithm.HMAC512("secretAccessToken");
    public static final JWTVerifier TEST_REFRESH_TOKEN_VERIFIER = JWT.require(TEST_REFRESH_TOKEN_ALGO)
            .withIssuer(TEST_ISSUER)
            .build();
    public static final JWTVerifier TEST_ACCESS_TOKEN_VERIFIER = JWT.require(TEST_ACCESS_TOKEN_ALGO)
            .withIssuer(TEST_ISSUER)
            .build();

    private TestUtil() {
    }

    public static User mockUser() {
        final User mockUser = User.builder()
                .id(TEST_ID)
                .username(TEST_USERNAME)
                .password(TEST_PASSWORD)
                .email(TEST_EMAIL)
                .build();

        mockUser.setTokenVersion(TEST_TOKEN_VERSION);

        return mockUser;
    }

    public static String generateMockRefreshToken() {
        final Instant now = Instant.now();
        final Instant expiresAt = now.plus(7, ChronoUnit.DAYS);

        return JWT.create()
                .withIssuer(TEST_ISSUER)
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiresAt))
                .withSubject(TEST_ID.toString())
                .withClaim("tokenVersion", TEST_TOKEN_VERSION)
                .sign(TEST_REFRESH_TOKEN_ALGO);
    }

    public static String generateMockAccessToken() {
        final Instant now = Instant.now();
        final Instant expires = Instant.now().plus(15, ChronoUnit.MINUTES);

        return JWT.create()
                .withIssuer(TEST_ISSUER)
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expires))
                .withSubject(TEST_USERNAME)
                .withClaim("userId", TEST_ID.toString())
                .sign(TEST_ACCESS_TOKEN_ALGO);
    }
}
