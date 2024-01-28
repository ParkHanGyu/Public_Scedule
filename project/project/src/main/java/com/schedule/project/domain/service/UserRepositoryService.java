package com.schedule.project.domain.service;

import com.schedule.project.domain.entity.UserEntity;
import com.schedule.project.domain.repository.UserEntityRepository;
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
