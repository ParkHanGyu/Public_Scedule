package com.schedule.project.domain.jpa.service;

import com.schedule.project.domain.jpa.repository.SchduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SchduleRepositoryService {
    private final SchduleRepository schduleRepository;
}
