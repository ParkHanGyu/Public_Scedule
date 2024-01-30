package com.schedule.project.domain.jpa.service;

import com.schedule.project.domain.jpa.entity.AuthNumber;
import com.schedule.project.domain.jpa.repository.AuthNumberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthNumberRepositoryService {
    private final AuthNumberRepository authNumberRepository;

    public void save(AuthNumber authNumber){
        authNumberRepository.save(authNumber);
    }
    public Optional<AuthNumber> findByUser(String user){
        return authNumberRepository.findByUser(user);
    } // 이메일 또는 전화번호로 찾음

    public void deleteByUser(String user){
        authNumberRepository.deleteByUser(user);
    }
}
