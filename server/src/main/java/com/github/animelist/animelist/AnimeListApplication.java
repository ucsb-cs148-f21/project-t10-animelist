package com.github.animelist.animelist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
@ConfigurationPropertiesScan("com.github.animelist.animelist.config")
public class AnimeListApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnimeListApplication.class, args);
    }
}
