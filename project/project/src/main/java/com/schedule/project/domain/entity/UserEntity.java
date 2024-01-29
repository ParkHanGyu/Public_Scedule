package com.schedule.project.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity // 엔티티라고 알려줌
@Getter
@NoArgsConstructor // 생성자
public class UserEntity {
    @Id // pk값인데
    @GeneratedValue // 이건 db가 자동으로 pk값을 생성을 해주는 것
    @Column(name = "user_id") // column 이름 변경
    private Long id;
    @Column(name = "user_email")
    private String email;
    @Column(name = "user_password")
    private String password;
    @Column(name = "user_phone_number")
    private String phoneNumber;
    @Column(name = "user_signup_date")
    private String signupDate; // 회원 가입 날짜
    @Column(name = "user_admin")
    private String admin;
    @Column(name = "user_name")
    private String name;


}
