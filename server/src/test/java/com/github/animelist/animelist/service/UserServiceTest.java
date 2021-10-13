package com.github.animelist.animelist.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.animelist.animelist.util.TestUtil;
import com.github.animelist.animelist.config.jwt.JwtConfigProperties;
import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.repository.UserRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtConfigProperties jwtConfigProperties;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(
                userRepository,
                passwordEncoder,
                TestUtil.TEST_ACCESS_TOKEN_ALGO,
                TestUtil.TEST_ACCESS_TOKEN_VERIFIER,
                jwtConfigProperties
        );
    }

    @Test
    void createUser_happy() {
        final User mockRequestUser = User.builder()
                .username(TestUtil.TEST_USERNAME)
                .email(TestUtil.TEST_EMAIL)
                .password(TestUtil.TEST_PASSWORD)
                .build();
        final User mockUser = TestUtil.mockUser();

        when(passwordEncoder.encode(any())).thenReturn(TestUtil.TEST_PASSWORD);
        when(userRepository.save(mockRequestUser)).thenReturn(mockUser);

        final User actualUser = userService.createUser(TestUtil.TEST_USERNAME, TestUtil.TEST_EMAIL, TestUtil.TEST_PASSWORD);

        assertThat(actualUser, is(mockUser));
    }

    @Test
    void getUser_happy() {
        final User mockUser = TestUtil.mockUser();

        when(userRepository.findById(TestUtil.TEST_ID)).thenReturn(Optional.of(mockUser));

        final Optional<User> actual = userService.getUser(TestUtil.TEST_ID);

        assertThat(actual, is(Optional.of(mockUser)));
    }

    @ParameterizedTest
    @ValueSource(strings = { TestUtil.TEST_USERNAME, TestUtil.TEST_EMAIL })
    void getUserByUsernameOrEmail_happy(final String usernameOrEmail) {
        final User mockUser = TestUtil.mockUser();

        when(userRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(usernameOrEmail, usernameOrEmail)).thenReturn(Optional.of(mockUser));

        final Optional<User> actual = userService.getUserByUsernameOrEmail(usernameOrEmail);

        assertThat(actual, is(Optional.of(mockUser)));
    }

    @Test
    void getUserDetailsFromToken_happy() {
        final JwtUserDetails expectedUserDetails = JwtUserDetails.builder()
                .id(TestUtil.TEST_ID)
                .username(TestUtil.TEST_USERNAME)
                .build();

        final Optional<JwtUserDetails> actual = userService.getUserDetailsFromToken(TestUtil.generateMockAccessToken());

        assertThat(actual, is(Optional.of(expectedUserDetails)));
    }

    @Test
    void getUserDetailsFromToken_invalid() {
        final Optional<JwtUserDetails> actual = userService.getUserDetailsFromToken("invalid token");

        assertThat(actual, is(Optional.empty()));
    }

    @Test
    void generateAccessToken_happy() {
        final User mockUser = TestUtil.mockUser();
        when(jwtConfigProperties.getIssuer()).thenReturn(TestUtil.TEST_ISSUER);

        final String actualToken = userService.generateAccessToken(mockUser);
        final DecodedJWT decodedJWT = TestUtil.TEST_ACCESS_TOKEN_VERIFIER.verify(actualToken);
        final Instant createdAt = decodedJWT.getIssuedAt().toInstant();
        final Instant expiresAt = decodedJWT.getExpiresAt().toInstant();
        final Duration duration = Duration.between(createdAt, expiresAt);

        assertThat(decodedJWT.getIssuer(), Matchers.is(TestUtil.TEST_ISSUER));
        assertThat(decodedJWT.getSubject(), is(mockUser.getUsername()));
        assertThat(decodedJWT.getClaim("userId").asString(), is(mockUser.getId().toString()));
        assertThat(duration.getSeconds(), is(TimeUnit.MINUTES.toSeconds(15)));
    }
}
