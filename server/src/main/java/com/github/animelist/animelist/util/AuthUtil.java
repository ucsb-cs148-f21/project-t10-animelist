package com.github.animelist.animelist.util;

import com.github.animelist.animelist.model.JwtUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

public final class AuthUtil {
    private AuthUtil() {
    }

    public static JwtUserDetails getUserDetails() {
        return (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
