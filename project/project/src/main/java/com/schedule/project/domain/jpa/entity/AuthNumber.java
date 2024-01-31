package com.schedule.project.domain.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class AuthNumber {
    @Id @GeneratedValue
    @Column(name = "auth_number_id")
    private Long id;
    @Column(name = "auth_number_user")
    private String user; // 핸드폰 번호 또는 이메일
    @Column(name = "auth_number")
    private String authNumber;

    public AuthNumber(String user, String authNumber) {
        this.user = user;
        this.authNumber = authNumber;
    }
}
