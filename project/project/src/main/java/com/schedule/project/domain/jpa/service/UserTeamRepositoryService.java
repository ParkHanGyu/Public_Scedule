package com.schedule.project.domain.jpa.service;

import com.schedule.project.domain.jpa.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserTeamRepositoryService {
    private final UserTeamRepository userTeamRepository;
}
