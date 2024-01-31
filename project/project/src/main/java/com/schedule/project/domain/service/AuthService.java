package com.schedule.project.domain.service;

import com.schedule.project.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.schedule.project.domain.dto.request.auth.EmailAuthRequestDto;
import com.schedule.project.domain.dto.request.auth.SignInRequestDto;
import com.schedule.project.domain.dto.request.auth.SignUpRequestDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthChkResponseDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthResponseDto;
import com.schedule.project.domain.dto.response.auth.SignInResponseDto;
import com.schedule.project.domain.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<? super EmailAuthResponseDto> emailAuth(EmailAuthRequestDto dto);
    ResponseEntity<? super EmailAuthChkResponseDto> emailAuthChk(EmailAuthChkRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
