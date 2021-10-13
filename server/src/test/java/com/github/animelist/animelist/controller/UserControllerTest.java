package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.input.LoginInput;
import com.github.animelist.animelist.model.input.RegisterInput;
import com.github.animelist.animelist.model.response.LoginResponse;
import com.github.animelist.animelist.model.response.RegisterResponse;
import com.github.animelist.animelist.service.RefreshTokenService;
import com.github.animelist.animelist.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static com.github.animelist.animelist.util.TestUtil.TEST_EMAIL;
import static com.github.animelist.animelist.util.TestUtil.TEST_ID;
import static com.github.animelist.animelist.util.TestUtil.TEST_PASSWORD;
import static com.github.animelist.animelist.util.TestUtil.TEST_USERNAME;
import static com.github.animelist.animelist.util.TestUtil.generateMockAccessToken;
import static com.github.animelist.animelist.util.TestUtil.generateMockRefreshToken;
import static com.github.animelist.animelist.util.TestUtil.mockUser;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private RefreshTokenService refreshTokenService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserController userController;

    @Test
    void me_happy() {
        mockAuthenticationPrincipal();
        final User mockUser = mockUser();

        when(userService.getUser(TEST_ID)).thenReturn(Optional.of(mockUser));

        final User actualUser = userController.me();

        assertThat(actualUser, is(mockUser));
    }

    @Test
    void register_happy() {
        final RegisterInput input = new RegisterInput(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);
        final RegisterResponse actualResponse = userController.register(input);

        verify(userService, times(1)).createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);
        assertThat(actualResponse.success(), is(true));
    }

    @ParameterizedTest
    @ValueSource(strings = { TEST_USERNAME, TEST_EMAIL })
    void login_happy(final String usernameOrEmail) {
        final User mockUser = mockUser();
        final JwtUserDetails jwtUserDetails = JwtUserDetails.builder()
                .id(TEST_ID)
                .username(TEST_USERNAME)
                .password(TEST_PASSWORD)
                .build();
        final Authentication mockAuth = mock(Authentication.class);

        when(mockAuth.getPrincipal()).thenReturn(jwtUserDetails);
        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usernameOrEmail, TEST_PASSWORD))).thenReturn(mockAuth);

        final String accessToken = generateMockAccessToken();
        final String refreshToken = generateMockRefreshToken();

        when(userService.getUserByUsernameOrEmail(any())).thenReturn(Optional.of(mockUser));
        when(userService.generateAccessToken(mockUser)).thenReturn(accessToken);
        when(refreshTokenService.generateRefreshToken(mockUser)).thenReturn(refreshToken);

        final LoginInput input = new LoginInput(usernameOrEmail, TEST_PASSWORD);
        final LoginResponse expectedResponse = new LoginResponse(true, accessToken, mockUser);

        final LoginResponse actualResponse = userController.login(input);

        verify(refreshTokenService, times(1)).generateRefreshToken(mockUser);
        assertThat(actualResponse, is(expectedResponse));
    }

    @Test
    void login_badCredentials() {
        when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);

        final LoginInput input = new LoginInput(TEST_USERNAME, TEST_PASSWORD);

        assertThrows(BadCredentialsException.class, () -> userController.login(input));
    }

    @Test
    void logout_happy() {
        userController.logout();

        verify(refreshTokenService, times(1)).setRefreshTokenCookie(any(), eq(null));
    }

    private void mockAuthenticationPrincipal() {
        final JwtUserDetails mockJwtUserDetails = JwtUserDetails.builder()
                .username(TEST_USERNAME)
                .id(TEST_ID)
                .build();
        final Authentication auth = mock(Authentication.class);
        when(auth.getPrincipal()).thenReturn(mockJwtUserDetails);
        final SecurityContext secCtx = mock(SecurityContext.class);
        when(secCtx.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(secCtx);
    }
}
