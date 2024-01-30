package com.schedule.project.domain.jpa.repository;

import com.schedule.project.domain.jpa.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTeamRepository extends JpaRepository<UserTeam,Long> {
}
