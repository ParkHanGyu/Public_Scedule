package com.schedule.project.domain.jpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class TeamBoard {

    @Id
    @GeneratedValue
    @Column(name = "team_board_id")
    private Long id;

    @Column(name = "team_board_title")
    private String title; // 제목

    @Column(name = "team_board_content")
    private String content; // 내용

    @Column(name = "board_wirte_date")
    private String writeDate; // 작성 날짜

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;
}
