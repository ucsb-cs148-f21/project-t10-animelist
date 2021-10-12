package com.github.animelist.animelist.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.animelist.animelist.entity.MALToken;
import com.github.animelist.animelist.repository.UserRepository;
import com.github.animelist.animelist.config.jwt.JwtConfigProperties;
import com.github.animelist.animelist.model.JwtUserDetails;
import com.github.animelist.animelist.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Component
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Algorithm accessTokenAlgo;
    private final JWTVerifier accessTokenVerifier;
    private final JwtConfigProperties jwtConfigProperties;

    @Autowired
    public UserService(
            final UserRepository userRepository,
            final PasswordEncoder passwordEncoder,
            final Algorithm accessTokenAlgo,
            final JWTVerifier accessTokenVerifier,
            final JwtConfigProperties jwtConfigProperties
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.accessTokenAlgo = accessTokenAlgo;
        this.accessTokenVerifier = accessTokenVerifier;
        this.jwtConfigProperties = jwtConfigProperties;
    }

    public User createUser(final String username, final String email, final String password) {
        final String hashedPassword = passwordEncoder.encode(password);
        final User user = User.builder()
                .username(username)
                .email(email)
                .password(hashedPassword)
                .build();

        return userRepository.save(user);
    }

    public Optional<User> getUser(final UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsernameOrEmail(final String usernameOrEmail) {
        return userRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(usernameOrEmail, usernameOrEmail);
    }

    public Optional<JwtUserDetails> getUserDetailsFromToken(final String token) {
        try {
            final DecodedJWT decoded = accessTokenVerifier.verify(token);

            final JwtUserDetails userDetails = JwtUserDetails.builder()
                    .id(UUID.fromString(decoded.getClaim("userId").asString()))
                    .username(decoded.getSubject())
                    .build();

            return Optional.of(userDetails);
        } catch (JWTVerificationException ex) {
            return Optional.empty();
        }
    }

    public String generateAccessToken(final User user) {
        final Instant now = Instant.now();
        final Instant expires = Instant.now().plus(15, ChronoUnit.MINUTES);

        return JWT.create()
                .withIssuer(jwtConfigProperties.getIssuer())
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expires))
                .withSubject(user.getUsername())
                .withClaim("userId", user.getId().toString())
                .sign(accessTokenAlgo);
    }
}
