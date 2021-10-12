package com.github.animelist.animelist.repository;

import com.github.animelist.animelist.entity.MALToken;
import com.github.animelist.animelist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MALTokenRepository extends JpaRepository<MALToken, UUID> {
    Optional<MALToken> findByMalId(final int malId);
    Optional<MALToken> findByUser(final User user);
}
