package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.response.RefreshTokenResponse;
import com.github.animelist.animelist.service.RefreshTokenService;
import com.github.animelist.animelist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final HttpServletResponse httpServletResponse;

    @Autowired
    public RefreshTokenController(
            final RefreshTokenService refreshTokenService,
            final UserService userService,
            final HttpServletResponse httpServletResponse
    ) {
        this.refreshTokenService = refreshTokenService;
        this.userService = userService;
        this.httpServletResponse = httpServletResponse;
    }

    @PostMapping("/refresh_token")
    public RefreshTokenResponse refreshToken(@CookieValue("jid") String refreshToken) {
        return refreshTokenService.verify(refreshToken)
                .map(user -> regenerateTokens(user, httpServletResponse))
                .orElseGet(() -> clearTokens(httpServletResponse));
    }

    private RefreshTokenResponse regenerateTokens(final User user, final HttpServletResponse response) {
        final String newRefreshToken = refreshTokenService.generateRefreshToken(user);
        final String accessToken = userService.generateAccessToken(user);

        refreshTokenService.setRefreshTokenCookie(response, newRefreshToken);

        return RefreshTokenResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    private RefreshTokenResponse clearTokens(final HttpServletResponse response) {
        refreshTokenService.setRefreshTokenCookie(response, null);

        return RefreshTokenResponse.builder()
                .accessToken(null)
                .build();
    }
}
