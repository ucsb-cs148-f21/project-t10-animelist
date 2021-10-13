package com.github.animelist.animelist.filter;

import com.github.animelist.animelist.service.UserService;
import com.github.animelist.animelist.model.JwtUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static java.util.function.Predicate.not;

@Configuration
public class JwtTokenFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
    private final UserService userService;

    @Autowired
    public JwtTokenFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain
    ) throws ServletException, IOException {
        getTokenFromHeader(request)
                .flatMap(userService::getUserDetailsFromToken)
                .map(jwtUserDetails -> formAuthentication(jwtUserDetails, request))
                .ifPresent(authentication -> SecurityContextHolder.getContext().setAuthentication(authentication));

        filterChain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken formAuthentication(
            final JwtUserDetails jwtUserDetails,
            final HttpServletRequest request
    ) {
        final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                jwtUserDetails,
                null,
                jwtUserDetails.getAuthorities()
        );

        token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        return token;
    }

    private Optional<String> getTokenFromHeader(final HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .filter(not(String::isEmpty))
                .map(val -> val.split(" ")[1]);
    }
}
