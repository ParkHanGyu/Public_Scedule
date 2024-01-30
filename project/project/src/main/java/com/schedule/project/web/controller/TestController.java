package com.schedule.project.web.controller;

import com.schedule.project.domain.jpa.service.UserRepositoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final UserRepositoryService userRepositoryService;

}
