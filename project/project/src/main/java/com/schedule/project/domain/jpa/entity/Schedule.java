package com.schedule.project.domain.jpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Schedule {
    @Id @GeneratedValue
    @Column(name = "schedule_id")
    private Long id;

    @Column(name = "schedule_title")
    private String title; // 제목
    @Column(name = "schedule_content")
    private String content; // 내용
    @Column(name = "schedule_write_date")
    private String writeDate; // 작성날짜
    @Column(name = "schedule_check")
    private boolean check; // 수행 여부 확인
    @Column(name = "schedule_priority")
    private Integer priority; // 우선 순위
    @Column(name = "schedule_finish_date")
    private String finishDate; // 수행날짜
    @Column(name = "schedule_type")
    private String type; // 타입

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY) // 스케쥴이 다, 유저가 1 그래서 ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
