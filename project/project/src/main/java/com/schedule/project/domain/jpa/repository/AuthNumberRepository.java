package com.schedule.project.domain.jpa.repository;

import com.schedule.project.domain.jpa.entity.AuthNumber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthNumberRepository extends JpaRepository<AuthNumber,Long> {
    Optional<AuthNumber> findByUser(String user);
    void deleteByUser(String user);
}
