package com.schedule.project.domain.jpa.repository;

import com.schedule.project.domain.jpa.entity.TeamBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamBoardRepository extends JpaRepository<TeamBoard,Long> {
}
