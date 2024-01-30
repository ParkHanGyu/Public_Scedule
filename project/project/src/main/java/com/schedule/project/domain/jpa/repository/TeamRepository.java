package com.schedule.project.domain.jpa.repository;

import com.schedule.project.domain.jpa.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team,Long> {
}
