package com.schedule.project.domain.jpa.service;

import com.schedule.project.domain.jpa.entity.UserEntity;
import com.schedule.project.domain.jpa.repository.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@RequiredArgsConstructor
public class UserRepositoryService {

    private final UserEntityRepository userEntityRepository;

    public Optional<UserEntity> findByEmail(String email){
        return userEntityRepository.findByEmail(email);
    }
}
