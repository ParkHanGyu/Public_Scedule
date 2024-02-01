package com.schedule.project.domain.jpa.service;

import com.schedule.project.domain.jpa.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserTeamRepositoryService {
    private final UserTeamRepository userTeamRepository;

    public List<String> findTeamNameByUserEmail(String email){ // 유저 이메일로 팀 이름들 찾기
        return userTeamRepository.findTeamNameByUserEmail(email);
    }
}
