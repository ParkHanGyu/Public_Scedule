package com.schedule.project.web.controller;


import com.schedule.project.domain.dto.response.schdule.GetMyTeamListResponseDto;
import com.schedule.project.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/get-my-team")
    public ResponseEntity<? super GetMyTeamListResponseDto> getMyTeamList(
//            @AuthenticationPrincipal String email
    ){
        String email = "ghsmsl@naver.com";
        return userService.getMyTeamList(email);
    }
}
