package com.schedule.project.domain.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NicknameDuplChkRequestDto {
    @NotBlank
    String nickname;
}
