package com.schedule.project.domain.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Team {

    @Id @GeneratedValue
    @Column(name = "team_id")
    private Long id;

    @Column(name = "team_name")
    private String name; // 팀 이름

    @Column(name = "team_create_date")
    private String craateDate; // 팀 생성 일자

    @Column(name = "team_only_my_schedule")
    private Boolean onlyMySchedule; // 회원가입할 때
}
