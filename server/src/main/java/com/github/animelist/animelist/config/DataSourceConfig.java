package com.github.animelist.animelist.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataSourceConfig {

    @Value("${database.url}")
    private String databaseUrl;

    @Value("${pg.sslmode:require}")
    private String sslmode;

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        final URI dbUri = new URI(databaseUrl);

        final String username = dbUri.getUserInfo().split(":")[0];
        final String password = dbUri.getUserInfo().split(":")[1];
        final String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() +
                // By default ssl is used. Set sslmode to disable to have http connections.
                "?sslmode=" + sslmode;

        return DataSourceBuilder.create()
                .username(username)
                .password(password)
                .url(dbUrl)
                .build();
    }
}
