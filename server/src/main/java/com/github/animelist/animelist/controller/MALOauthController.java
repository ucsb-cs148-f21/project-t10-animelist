package com.github.animelist.animelist.controller;

import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.input.MALOauthInput;
import com.github.animelist.animelist.model.mal.MALOauth2Token;
import com.github.animelist.animelist.model.response.LoginResponse;
import com.github.animelist.animelist.service.MALService;
import com.github.animelist.animelist.service.RefreshTokenService;
import com.github.animelist.animelist.service.UserService;
import com.github.animelist.animelist.util.AuthUtil;
import com.github.animelist.animelist.util.PKCEUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@Controller
public class MALOauthController {

    private static final Logger log = LoggerFactory.getLogger(MALOauthController.class);
    private final MALService malService;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final HttpServletRequest httpServletRequest;
    private final HttpServletResponse httpServletResponse;

    @Autowired
    public MALOauthController(
            final MALService malOauthService,
            final UserService userService,
            final RefreshTokenService refreshTokenService,
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) {
        this.malService = malOauthService;
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
        this.httpServletRequest = httpServletRequest;
        this.httpServletResponse = httpServletResponse;
    }

    @QueryMapping
    public String malLinkOauth() {
        final String codeVerifier = PKCEUtil.generateCodeVerifier();
        malService.setMALCookie(httpServletResponse, codeVerifier);

        return malService.getOauthUrl(codeVerifier, UUID.randomUUID().toString(), malService.linkRedirect());
    }

    @QueryMapping
    public String malLoginOauth() {
        final String codeVerifier = PKCEUtil.generateCodeVerifier();
        malService.setMALCookie(httpServletResponse, codeVerifier);

        return malService.getOauthUrl(codeVerifier, UUID.randomUUID().toString(), malService.loginRedirect());
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated")
    public boolean malLink(@Argument("input") MALOauthInput input) {
        final String codeVerifier = WebUtils.getCookie(httpServletRequest, "mal").getValue();
        final JwtUserDetails userDetails = AuthUtil.getUserDetails();
        final MALOauth2Token tokens = malService.getTokens(codeVerifier, input.code(), input.state(), malService.linkRedirect()).orElseThrow();
        final Integer malId = malService.getMALId(tokens.access_token()).orElseThrow();
        final User user = userService.getUser(userDetails.getId()).orElseThrow();
        final User linkedUser = malService.getUser(malId).orElse(user);

        if (!user.equals(linkedUser)) {
            throw new RuntimeException("MAL is already linked to another account!");
        }

        malService.refreshMALToken(user, malId, tokens.access_token(), tokens.refresh_token());

        return true;
    }

    @MutationMapping
    public LoginResponse malLogin(@Argument("input") MALOauthInput input) {
        final String codeVerifier = WebUtils.getCookie(httpServletRequest, "mal").getValue();
        final MALOauth2Token tokens = malService.getTokens(codeVerifier, input.code(), input.state(), malService.loginRedirect()).orElseThrow();
        final Integer malId = malService.getMALId(tokens.access_token()).orElseThrow();
        final User user = malService.getUser(malId).orElseThrow();

        malService.refreshMALToken(user, malId, tokens.access_token(), tokens.refresh_token());

        final String accessToken = userService.generateAccessToken(user);
        final String refreshToken = refreshTokenService.generateRefreshToken(user);

        // set jid cookie
        refreshTokenService.setRefreshTokenCookie(httpServletResponse, refreshToken);

        return new LoginResponse(
                true,
                accessToken,
                user
        );
    }
}
