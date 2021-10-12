package com.github.animelist.animelist.service;

import com.github.animelist.animelist.config.mal.MALConfigProperties;
import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.mal.MALOauth2Token;
import com.github.animelist.animelist.entity.MALToken;
import com.github.animelist.animelist.model.mal.MALUsers;
import com.github.animelist.animelist.repository.MALTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Optional;

@Component
public class MALService {

    private static final Logger log = LoggerFactory.getLogger(MALService.class);
    private final WebClient malV1;
    private final WebClient malV2;
    private final MALConfigProperties malOauthConfig;
    private final MALTokenRepository malTokenRepository;

    @Autowired
    public MALService(
            final WebClient malV1,
            final WebClient malV2,
            final MALConfigProperties malOauthConfig,
            final MALTokenRepository malTokenRepository
    ) {
        this.malV1 = malV1;
        this.malV2 = malV2;
        this.malOauthConfig = malOauthConfig;
        this.malTokenRepository = malTokenRepository;
    }

    public String linkRedirect() {
        return malOauthConfig.getLinkRedirect();
    }

    public String loginRedirect() {
        return malOauthConfig.getLoginRedirect();
    }

    public String getOauthUrl(final String codeChallenge, final String state, final String redirect) {
        return UriComponentsBuilder.fromHttpUrl("https://myanimelist.net/v1/oauth2/authorize")
                .queryParam("response_type", "code")
                .queryParam("client_id", malOauthConfig.getClientId())
                .queryParam("code_challenge", codeChallenge)
                .queryParam("state", state)
                .queryParam("code_challenge_method", "plain")
                .queryParam("redirect_uri", redirect)
                .toUriString();
    }

    public Optional<MALOauth2Token> getTokens(
            final String codeVerifier,
            final String authCode,
            final String state,
            final String redirect
    ) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        body.add("client_id", malOauthConfig.getClientId());
        body.add("client_secret", malOauthConfig.getClientSecret());
        body.add("code", authCode);
        body.add("code_verifier", codeVerifier);
        body.add("state", state);
        body.add("grant_type", "authorization_code");
        body.add("redirect_uri", redirect);

        return malV1.post()
                .uri("/oauth2/token")
                .body(BodyInserters.fromFormData(body))
                .retrieve()
                .bodyToMono(MALOauth2Token.class)
                .blockOptional();
    }

    public void refreshMALToken(
            final User user,
            final Integer malId,
            final String accessToken,
            final String refreshToken
    ) {
        final MALToken token = malTokenRepository.findByUser(user)
                .orElseGet(MALToken::new);

        token.setMalId(malId);
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setUser(user);

        malTokenRepository.save(token);
    }

    public Optional<Integer> getMALId(final String accessToken) {
        return malV2.get()
                .uri(builder -> builder
                        .path("/users/@me")
                        .queryParam("fields", "id")
                        .build()
                )
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(MALUsers.class)
                .blockOptional()
                .map(MALUsers::id);
    }

    @Transactional
    public Optional<User> getUser(final Integer malId) {
        return malTokenRepository.findByMalId(malId)
                .map(MALToken::getUser);
    }

    public void setMALCookie(final HttpServletResponse response, final String codeVerifier) {
        final ResponseCookie malAuthCookie = malCookie(codeVerifier);

        response.addHeader(HttpHeaders.SET_COOKIE, malAuthCookie.toString());
    }

    private ResponseCookie malCookie(final String codeVerifier) {
        return ResponseCookie.from("mal", codeVerifier)
                .httpOnly(true)
                .path("/graphql")
                // allow cross site cookie sending
                // useful when backend is on heroku domain and frontend is in nextjs domain
                // normally they should be under one domain name and therefore
                // this would not be needed
                // needs third party cookies to be enabled in browsers
                .sameSite("None")
                .secure(true)
                .build();
    }
}
