package com.schedule.project.domain.service;

import com.schedule.project.domain.dto.response.schdule.GetMyTeamListResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<? super GetMyTeamListResponseDto> getMyTeamList(String email);
}
