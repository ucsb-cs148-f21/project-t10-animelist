package com.github.animelist.animelist.util;

import org.apache.tomcat.util.codec.binary.Base64;

import java.security.SecureRandom;

public final class PKCEUtil {

    private PKCEUtil() {
    }

    public static String generateCodeVerifier() {
        final SecureRandom random = new SecureRandom();
        final byte[] randomBytes = new byte[64];
        random.nextBytes(randomBytes);

        return Base64.encodeBase64URLSafeString(randomBytes);
    }
}
