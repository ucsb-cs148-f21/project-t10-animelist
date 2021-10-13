package com.github.animelist.animelist.repository;

import com.github.animelist.animelist.entity.MALToken;
import com.github.animelist.animelist.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MALTokenRepository extends MongoRepository<MALToken, String> {
    Optional<MALToken> findByMalId(final int malId);
    Optional<MALToken> findByUser(final User user);
}
