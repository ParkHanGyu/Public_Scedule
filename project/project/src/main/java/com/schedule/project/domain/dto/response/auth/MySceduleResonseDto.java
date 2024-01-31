package com.schedule.project.domain.dto.response.auth;

import lombok.Data;

@Data
public class MySceduleResonseDto { // 아직 수정해야함

    private String schduleName;
    private String writeDate;
    private Integer priority;
    private boolean check;
}
