package com.schedule.project.domain.service.implement;

import com.schedule.project.domain.common.AuthenticationNumber;
import com.schedule.project.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.schedule.project.domain.dto.request.auth.EmailAuthRequestDto;
import com.schedule.project.domain.dto.response.EmailAuthChkResponseDto;
import com.schedule.project.domain.dto.response.EmailAuthResponseDto;
import com.schedule.project.domain.jpa.entity.AuthNumber;
import com.schedule.project.domain.jpa.entity.UserEntity;
import com.schedule.project.domain.jpa.service.AuthNumberRepositoryService;
import com.schedule.project.domain.jpa.service.UserRepositoryService;
import com.schedule.project.domain.provider.EmailProvider;
import com.schedule.project.domain.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthImplement implements AuthService {
    private final AuthNumberRepositoryService authNumberService;
    private final UserRepositoryService userRepositoryService;
    private final EmailProvider emailProvider;
    @Override // 인증 번호 요청
    public ResponseEntity<? super EmailAuthResponseDto> emailAuth(EmailAuthRequestDto dto) {
        try{
            String email = dto.getEmail();
            authNumberService.deleteByUser(email);
            Optional<UserEntity> userOptional = userRepositoryService.findByEmail(email);
            if(userOptional.isPresent()) return EmailAuthResponseDto.duplicateEmail(); // 중복 이메일

            String authenticationNumber = AuthenticationNumber.getAuthenticationNumber();
            boolean isSucceed = emailProvider.sendMail(email,authenticationNumber);
            if(!isSucceed) return EmailAuthResponseDto.mailSendFail();

            AuthNumber authNumber = new AuthNumber(email,authenticationNumber);
            authNumberService.save(authNumber);
        } catch (Exception e){
          e.printStackTrace();
          return EmailAuthResponseDto.databaseError();
        }
        return EmailAuthResponseDto.success();
    }

    @Override // 인증 번호 확인 메서드
    public ResponseEntity<? super EmailAuthChkResponseDto> emailAuthChk(EmailAuthChkRequestDto dto) {
        try{
            String getEmail = dto.getEmail();
            Optional<AuthNumber> byUser = authNumberService.findByUser(getEmail);
            if(byUser.isPresent()) return EmailAuthChkResponseDto.validationFailEmail(); // 유효성 실패 이메일

            Optional<UserEntity> optionalUser = userRepositoryService.findByEmail(getEmail);
            if(optionalUser.isPresent()) return EmailAuthChkResponseDto.duplicateEmail(); // 중복 이메일

            authNumberService.deleteByUser(getEmail);
        } catch (Exception e){
            e.printStackTrace();
            return EmailAuthChkResponseDto.databaseError();
        }
        return EmailAuthChkResponseDto.success(dto.getEmail());
    }
}
