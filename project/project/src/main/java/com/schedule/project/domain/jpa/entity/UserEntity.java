package com.schedule.project.domain.jpa.entity;

import com.schedule.project.domain.dto.request.auth.SignUpRequestDto;
import com.schedule.project.domain.jpa.entity.enumType.ADMIN;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

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
    private String signUpDate; // 회원 가입 날짜
    @Column(name = "user_update_date")
    private String updateDate; // 회원 정보 수정 날짜
    @Enumerated(EnumType.STRING)
    private ADMIN admin = ADMIN.NORMAL;
    @Column(name = "user_nickname")
    private String nickname;

    public UserEntity(SignUpRequestDto dto) {
        email = dto.getEmail();
        password = dto.getPassword();
        phoneNumber = dto.getPhoneNumber();
        signUpDate = dto.getSignUpDate();
        updateDate = dto.getUpdateDate();
        nickname = dto.getNickname();
    }
}
