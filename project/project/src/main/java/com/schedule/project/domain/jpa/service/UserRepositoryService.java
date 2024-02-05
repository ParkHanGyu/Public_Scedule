package com.schedule.project.domain.jpa.service;

import com.schedule.project.domain.jpa.entity.UserEntity;
import com.schedule.project.domain.jpa.repository.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class UserRepositoryService {

    private final UserEntityRepository userEntityRepository;

    public void save(UserEntity userEntity){userEntityRepository.save(userEntity);}
    public Optional<UserEntity> findByEmail(String email){
        return userEntityRepository.findByEmail(email);
    }
    public Optional<UserEntity> findByNickname(String name) {return userEntityRepository.findByNickname(name);}
}
