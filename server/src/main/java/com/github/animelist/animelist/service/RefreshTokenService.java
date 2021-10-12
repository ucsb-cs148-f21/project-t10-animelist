package com.github.animelist.animelist.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.animelist.animelist.repository.UserRepository;
import com.github.animelist.animelist.config.jwt.JwtConfigProperties;
import com.github.animelist.animelist.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Component
public class RefreshTokenService {

    private final UserRepository userRepository;
    private final JwtConfigProperties jwtConfigProperties;
    private final Algorithm refreshTokenAlgo;
    private final JWTVerifier refreshTokenVerifier;

    @Autowired
    public RefreshTokenService(
            final UserRepository userRepository,
            final JwtConfigProperties jwtConfigProperties,
            final Algorithm refreshTokenAlgo,
            final JWTVerifier refreshTokenVerifier) {
        this.userRepository = userRepository;
        this.jwtConfigProperties = jwtConfigProperties;
        this.refreshTokenAlgo = refreshTokenAlgo;
        this.refreshTokenVerifier = refreshTokenVerifier;
    }

    public Optional<User> verify(final String token) {
        try {
            final DecodedJWT decodedJWT = refreshTokenVerifier.verify(token);
            final String userId = decodedJWT.getSubject();
            final int tokenVersion = decodedJWT.getClaim("tokenVersion").asInt();
            final Optional<User> userOptional = userRepository.findById(UUID.fromString(userId));

            return userOptional
                    .filter(user -> tokenVersion == user.getTokenVersion());
        } catch (final JWTVerificationException ex) {
            return Optional.empty();
        }
    }

    public String generateRefreshToken(final User user) {
        final Instant now = Instant.now();
        final Instant expiresAt = now.plus(7, ChronoUnit.DAYS);

        return JWT.create()
                .withIssuer(jwtConfigProperties.getIssuer())
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiresAt))
                .withSubject(user.getId().toString())
                .withClaim("tokenVersion", user.getTokenVersion())
                .sign(refreshTokenAlgo);
    }

    public void setRefreshTokenCookie(final HttpServletResponse response, final String refreshToken) {
        final ResponseCookie jidCookie = refreshTokenCookie(refreshToken);

        // because javax Cookie does not support same-site attribute
        // must use addHeader instead of addCookie
        response.addHeader(HttpHeaders.SET_COOKIE, jidCookie.toString());
    }

    private ResponseCookie refreshTokenCookie(final String refreshToken) {
        return ResponseCookie.from("jid", refreshToken)
                .httpOnly(true)
                .path("/refresh_token")
                // allow cross site cookie sending
                // useful when backend is on heroku domain and frontend is in nextjs domain
                // normally they should be under one domain name and therefore
                // this would not be needed
                // needs third party cookies to be enabled in browsers
                .sameSite("None")
                .secure(true)
                .maxAge(Duration.ofDays(7))
                .build();
    }
}
