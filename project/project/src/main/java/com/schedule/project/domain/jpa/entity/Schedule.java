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
    private String title;
    @Column(name = "schedule_content")
    private String content;
    @Column(name = "schedule_write_date")
    private String writeDate;
    @Column(name = "schedule_check")
    private boolean check;
    @Column(name = "schedule_priority")
    private Integer priority;

    @ManyToOne(fetch = FetchType.LAZY) // 스케쥴이 다, 유저가 1 그래서 ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
