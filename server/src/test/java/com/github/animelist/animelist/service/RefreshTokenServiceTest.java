package com.github.animelist.animelist.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.animelist.animelist.config.jwt.JwtConfigProperties;
import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.github.animelist.animelist.util.TestUtil.TEST_ID;
import static com.github.animelist.animelist.util.TestUtil.TEST_ISSUER;
import static com.github.animelist.animelist.util.TestUtil.TEST_REFRESH_TOKEN_ALGO;
import static com.github.animelist.animelist.util.TestUtil.TEST_REFRESH_TOKEN_VERIFIER;
import static com.github.animelist.animelist.util.TestUtil.TEST_TOKEN_VERSION;
import static com.github.animelist.animelist.util.TestUtil.generateMockRefreshToken;
import static com.github.animelist.animelist.util.TestUtil.mockUser;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RefreshTokenServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtConfigProperties jwtConfigProperties;

    private RefreshTokenService refreshTokenService;

    @BeforeEach
    void setUp() {
        refreshTokenService = new RefreshTokenService(
                userRepository,
                jwtConfigProperties,
                TEST_REFRESH_TOKEN_ALGO,
                TEST_REFRESH_TOKEN_VERIFIER
        );
    }

    @Test
    void verify_happy() {
        final User expectedUser = mockUser();
        final String mockRefreshToken = generateMockRefreshToken();

        when(userRepository.findById(TEST_ID)).thenReturn(Optional.of(expectedUser));

        final Optional<User> actual = refreshTokenService.verify(mockRefreshToken);

        assertThat(actual.isEmpty(), is(false));
        assertThat(actual.get(), is(expectedUser));
    }

    @Test
    void verify_differentTokenVersion() {
        final User expectedUser = mockUser();
        expectedUser.setTokenVersion(TEST_TOKEN_VERSION + 1);

        final String mockRefreshToken = generateMockRefreshToken();

        when(userRepository.findById(TEST_ID)).thenReturn(Optional.of(expectedUser));

        final Optional<User> actual = refreshTokenService.verify(mockRefreshToken);

        assertThat(actual.isEmpty(), is(true));
    }

    @Test
    void verify_invalid() {
        final Optional<User> actual = refreshTokenService.verify("invalid token");

        assertThat(actual.isEmpty(), is(true));
    }

    @Test
    void generateRefreshToken_happy() {
        final User mockUser = mockUser();

        when(jwtConfigProperties.getIssuer()).thenReturn(TEST_ISSUER);

        final String actualToken = refreshTokenService.generateRefreshToken(mockUser);
        final DecodedJWT decodedJWT = TEST_REFRESH_TOKEN_VERIFIER.verify(actualToken);
        final Instant createdAt = decodedJWT.getIssuedAt().toInstant();
        final Instant expiresAt = decodedJWT.getExpiresAt().toInstant();
        final Duration duration = Duration.between(createdAt, expiresAt);

        assertThat(decodedJWT.getIssuer(), is(TEST_ISSUER));
        assertThat(decodedJWT.getSubject(), is(mockUser.getId().toString()));
        assertThat(decodedJWT.getClaim("tokenVersion").asInt(), is(mockUser.getTokenVersion()));
        assertThat(duration.getSeconds(), is(TimeUnit.DAYS.toSeconds(7)));
    }

    @Test
    void setRefreshTokenCookie_happy() {
        final HttpServletResponse mockResponse = mock(HttpServletResponse.class);
        final String expectedRefreshToken = generateMockRefreshToken();
        final String expectedRefreshTokenCookie = refreshTokenCookie(expectedRefreshToken);

        refreshTokenService.setRefreshTokenCookie(mockResponse, expectedRefreshToken);

        verify(mockResponse, times(1))
                .addHeader(eq(HttpHeaders.SET_COOKIE), eq(expectedRefreshTokenCookie));
    }

    private String refreshTokenCookie(final String refreshToken) {
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
                .build()
                .toString();
    }
}
