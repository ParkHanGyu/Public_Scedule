package com.schedule.project.domain.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;

@Data @Getter
public class SignInRequestDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;

}
