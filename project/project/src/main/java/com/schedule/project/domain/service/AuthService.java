package com.schedule.project.domain.service;

import com.schedule.project.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.schedule.project.domain.dto.request.auth.EmailAuthRequestDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthChkResponseDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<? super EmailAuthResponseDto> emailAuth(EmailAuthRequestDto dto);
    ResponseEntity<? super EmailAuthChkResponseDto> emailAuthChk(EmailAuthChkRequestDto dto);
}
