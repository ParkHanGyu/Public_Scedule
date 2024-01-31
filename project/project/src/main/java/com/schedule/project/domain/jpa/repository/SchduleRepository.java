package com.schedule.project.domain.jpa.repository;

import com.schedule.project.domain.jpa.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchduleRepository extends JpaRepository<Schedule, Long> {
}
