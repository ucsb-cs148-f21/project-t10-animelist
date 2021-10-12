package com.github.animelist.animelist.config.mal;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mal")
public class MALConfigProperties {

    private String clientId;
    private String clientSecret;
    private String linkRedirect;
    private String loginRedirect;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(final String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(final String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getLinkRedirect() {
        return linkRedirect;
    }

    public void setLinkRedirect(String linkRedirect) {
        this.linkRedirect = linkRedirect;
    }

    public String getLoginRedirect() {
        return loginRedirect;
    }

    public void setLoginRedirect(String loginRedirect) {
        this.loginRedirect = loginRedirect;
    }
}
