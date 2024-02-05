package com.schedule.project.web.controller;

import com.schedule.project.domain.dto.request.auth.*;
import com.schedule.project.domain.dto.response.auth.*;
import com.schedule.project.domain.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/nickname-check") // 닉네임 중복 확인
    public ResponseEntity<? super NicknameDuplChkResponseDto> nicknameDuplChk(@RequestBody NicknameDuplChkRequestDto dto){
        ResponseEntity<? super NicknameDuplChkResponseDto> response = authService.nicknameDuplChk(dto);
        return response;
    }
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
