package com.github.animelist.animelist.config.mal;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class MALConfig {

    @Bean
    public WebClient malV1() {
        return WebClient.builder()
                .baseUrl("https://myanimelist.net/v1")
                .build();
    }

    @Bean
    public WebClient malV2() {
        return WebClient.builder()
                .baseUrl("https://api.myanimelist.net/v2")
                .build();
    }
}
