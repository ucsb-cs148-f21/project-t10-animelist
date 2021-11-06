package com.github.animelist.animelist.service;

import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class RatingSystemService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public RatingSystemService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public RatingSystem createRatingSystem(final RatingSystem ratingSystem) {
        return mongoTemplate.insert(ratingSystem);
    }

    public Optional<RatingSystem> getRatingSystem(final String id) {
        return Optional.ofNullable(mongoTemplate.findById(new ObjectId(id), RatingSystem.class));
    }
}
