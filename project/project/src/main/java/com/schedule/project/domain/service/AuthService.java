package com.schedule.project.domain.service;

import com.schedule.project.domain.dto.request.auth.*;
import com.schedule.project.domain.dto.response.auth.*;
import org.springframework.http.ResponseEntity;

public interface AuthService {


    // ================= post ==================//
    ResponseEntity<? super NicknameDuplChkResponseDto> nicknameDuplChk(NicknameDuplChkRequestDto dto);
    ResponseEntity<? super EmailAuthResponseDto> emailAuth(EmailAuthRequestDto dto);
    ResponseEntity<? super EmailAuthChkResponseDto> emailAuthChk(EmailAuthChkRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
