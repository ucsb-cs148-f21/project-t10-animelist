package com.github.animelist.animelist.repository;

import com.github.animelist.animelist.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsernameIgnoreCaseOrEmailIgnoreCase(String username, String email);
}
