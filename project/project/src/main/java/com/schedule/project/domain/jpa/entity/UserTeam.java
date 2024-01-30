package com.schedule.project.domain.jpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class UserTeam {
    // 회원과 팀의 키를 외래키로 가지고 있음.
    // 다대1관계

    @Id @GeneratedValue
    @Column(name = "user_team")
    private Long id;

    @Column(name = "user_team_add_user_date")
    private String addUserDate; // 팀원 추가 날짜

    @Column(name = "user_team_access_right")
    private String accessRight; // 권한

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

}
