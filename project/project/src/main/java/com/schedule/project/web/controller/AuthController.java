package com.schedule.project.web.controller;

import com.schedule.project.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.schedule.project.domain.dto.request.auth.EmailAuthRequestDto;
import com.schedule.project.domain.dto.response.EmailAuthChkResponseDto;
import com.schedule.project.domain.dto.response.EmailAuthResponseDto;
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
    @PostMapping("/sign-up/email-auth")
    public ResponseEntity<? super EmailAuthResponseDto> signUpEmailAuth(
            @RequestBody EmailAuthRequestDto dto){
        ResponseEntity<? super EmailAuthResponseDto> response = authService.emailAuth(dto);
        return response;
    }
    @PostMapping("/sign-up/email-auth-chk")
    public ResponseEntity<? super EmailAuthChkResponseDto> signUpEmailAuthChk(
            @RequestBody EmailAuthChkRequestDto dto){
        ResponseEntity<? super EmailAuthChkResponseDto> response = authService.emailAuthChk(dto);
        return response;
    }
}
