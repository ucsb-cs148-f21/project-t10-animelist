package com.github.animelist.animelist.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Bean
    public Algorithm accessTokenAlgo(final JwtConfigProperties properties) {
        return Algorithm.HMAC512(properties.getAccessTokenSecret());
    }

    @Bean
    public Algorithm refreshTokenAlgo(final JwtConfigProperties properties) {
        return Algorithm.HMAC512(properties.getRefreshTokenSecret());
    }

    @Bean
    public JWTVerifier accessTokenVerifier(final Algorithm accessTokenAlgo, final JwtConfigProperties properties) {
        return getVerifierFor(accessTokenAlgo, properties);
    }

    @Bean
    public JWTVerifier refreshTokenVerifier(final Algorithm refreshTokenAlgo, final JwtConfigProperties properties) {
        return getVerifierFor(refreshTokenAlgo, properties);
    }

    private JWTVerifier getVerifierFor(final Algorithm algo, final JwtConfigProperties properties) {
        return JWT
                .require(algo)
                .withIssuer(properties.getIssuer())
                .build();
    }
}
