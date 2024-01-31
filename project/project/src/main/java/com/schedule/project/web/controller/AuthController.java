package com.schedule.project.web.controller;

import com.schedule.project.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.schedule.project.domain.dto.request.auth.EmailAuthRequestDto;
import com.schedule.project.domain.dto.request.auth.SignInRequestDto;
import com.schedule.project.domain.dto.request.auth.SignUpRequestDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthChkResponseDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthResponseDto;
import com.schedule.project.domain.dto.response.auth.SignInResponseDto;
import com.schedule.project.domain.dto.response.auth.SignUpResponseDto;
import com.schedule.project.domain.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    @PostMapping("/sign-up/email-auth") // 이메일 인증 요청
    public ResponseEntity<? super EmailAuthResponseDto> signUpEmailAuth(
            @RequestBody EmailAuthRequestDto dto){
        return authService.emailAuth(dto);
    }
    @PostMapping("/sign-up/email-auth-chk") // 이메일 인증 확인
    public ResponseEntity<? super EmailAuthChkResponseDto> signUpEmailAuthChk(
            @RequestBody EmailAuthChkRequestDto dto){
        return authService.emailAuthChk(dto);
    }

    @PostMapping("/sign-in") // 로그인
    public ResponseEntity<? super SignInResponseDto> signIn(@RequestBody SignInRequestDto dto){
        return authService.signIn(dto);
    }
    @PostMapping("/sign-up") // 회원가입
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody SignUpRequestDto dto){
        return authService.signUp(dto);
    }
}
