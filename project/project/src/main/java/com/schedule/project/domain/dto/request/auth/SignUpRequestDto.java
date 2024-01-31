package com.schedule.project.domain.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class SignUpRequestDto {
    @NotBlank @Email
    private String email;
    @NotBlank @Size(min=8, max=20)
    private String password;
    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String nickname;
    @NotBlank
    private String signUpDate;
    @NotBlank
    private String updateDate;
}
