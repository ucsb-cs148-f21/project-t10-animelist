package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.response.RefreshTokenResponse;
import com.github.animelist.animelist.service.RefreshTokenService;
import com.github.animelist.animelist.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.github.animelist.animelist.util.TestUtil.generateMockRefreshToken;
import static com.github.animelist.animelist.util.TestUtil.mockUser;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RefreshTokenControllerTest {

    @Mock
    private RefreshTokenService refreshTokenService;

    @Mock
    private UserService userService;

    @InjectMocks
    private RefreshTokenController refreshTokenController;

    private static final String TEST_REFRESH_TOKEN = generateMockRefreshToken();

    @Test
    void refreshToken_regenerated() {
        final User mockUser = mockUser();
        final RefreshTokenResponse expectedResponse = RefreshTokenResponse.builder()
                .accessToken(TEST_REFRESH_TOKEN)
                .build();

        when(userService.generateAccessToken(mockUser)).thenReturn(TEST_REFRESH_TOKEN);
        when(refreshTokenService.verify(TEST_REFRESH_TOKEN)).thenReturn(Optional.of(mockUser));

        final RefreshTokenResponse actualRefreshTokenResponse = refreshTokenController
                .refreshToken(TEST_REFRESH_TOKEN);

        assertThat(actualRefreshTokenResponse, is(expectedResponse));
        verify(refreshTokenService, times(1)).setRefreshTokenCookie(any(), eq(null));
    }

    @Test
    void refreshToken_cleared() {
        final RefreshTokenResponse expectedResponse = RefreshTokenResponse.builder()
                .accessToken(null)
                .build();

        when(refreshTokenService.verify(any())).thenReturn(Optional.empty());

        final RefreshTokenResponse actualResponse = refreshTokenController.refreshToken(TEST_REFRESH_TOKEN);

        assertThat(actualResponse, is(expectedResponse));
        verify(refreshTokenService, times(1)).setRefreshTokenCookie(any(), eq(null));
    }
}
