package com.github.animelist.animelist.service;

import com.github.animelist.animelist.entity.User;
import com.github.animelist.animelist.model.ratingsystem.EmbeddedRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.RatingSystem;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
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
        final RatingSystem insertedRatingSystem =  mongoTemplate.insert(ratingSystem);
        final EmbeddedRatingSystem embeddedRatingSystem = EmbeddedRatingSystem.builder()
                .id(new ObjectId(insertedRatingSystem.getId()))
                .name(insertedRatingSystem.getName())
                .build();
        final Query userQuery = new Query().addCriteria(Criteria.where("_id").is(insertedRatingSystem.getOwnerId()));
        final Update pushEmbeddedRatingSystem = new Update().push("ratingSystems", embeddedRatingSystem);
        mongoTemplate.updateFirst(userQuery, pushEmbeddedRatingSystem, User.class);

        return insertedRatingSystem;
    }

    public Optional<RatingSystem> getRatingSystem(final String id) {
        return Optional.ofNullable(mongoTemplate.findById(new ObjectId(id), RatingSystem.class));
    }
}
