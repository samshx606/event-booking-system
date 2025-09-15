package com.worex.swe.bookingsystem.repository;

import com.worex.swe.bookingsystem.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    Page<User> findAll(Pageable pageable);
    void deleteByUsername(String username);
}
