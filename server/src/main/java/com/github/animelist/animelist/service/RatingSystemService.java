package com.github.animelist.animelist.service;

import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class RatingSystemService {

    private MongoTemplate mongoTemplate;

    @Autowired
    public RatingSystemService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void insertRatingSystem(final RatingSystem ratingSystem) {
        mongoTemplate.insert(ratingSystem);
    }
}
