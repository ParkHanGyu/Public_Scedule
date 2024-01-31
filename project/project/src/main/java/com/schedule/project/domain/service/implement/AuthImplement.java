package com.schedule.project.domain.service.implement;

import com.schedule.project.domain.common.AuthenticationNumber;
import com.schedule.project.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.schedule.project.domain.dto.request.auth.EmailAuthRequestDto;
import com.schedule.project.domain.dto.request.auth.SignInRequestDto;
import com.schedule.project.domain.dto.request.auth.SignUpRequestDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthChkResponseDto;
import com.schedule.project.domain.dto.response.auth.EmailAuthResponseDto;
import com.schedule.project.domain.dto.response.auth.SignInResponseDto;
import com.schedule.project.domain.dto.response.auth.SignUpResponseDto;
import com.schedule.project.domain.jpa.entity.AuthNumber;
import com.schedule.project.domain.jpa.entity.UserEntity;
import com.schedule.project.domain.jpa.service.AuthNumberRepositoryService;
import com.schedule.project.domain.jpa.service.UserRepositoryService;
import com.schedule.project.domain.provider.EmailProvider;
import com.schedule.project.domain.provider.JwtProvider;
import com.schedule.project.domain.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthImplement implements AuthService {
    private final AuthNumberRepositoryService authNumberService;
    private final UserRepositoryService userRepositoryService;
    private final EmailProvider emailProvider;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtProvider jwtProvider;

    // ==================== Get ====================== //
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

    // ==================== POST ================== //
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

    @Override // 로그인 기능
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
        String token;
        try{
            String getEmail = dto.getEmail();
            String getPassword = dto.getPassword(); // 클라이언트에서 받아온 email 및 password
            Optional<UserEntity> optionalUser = userRepositoryService.findByEmail(getEmail);
            if(optionalUser.isEmpty()) return SignInResponseDto.signInFailed();

            UserEntity userEntity = optionalUser.get();
            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(getPassword, encodedPassword);
            if(!isMatched) return SignInResponseDto.signInFailed(); // 비밀번호 틀렸을 때
            token = jwtProvider.create(getEmail);
        } catch (Exception e){
            e.printStackTrace();
            return SignInResponseDto.databaseError();
        }
        return SignInResponseDto.success(token);
    }

    @Override // 회원 가입
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try{
            String dtoEmail = dto.getEmail();
            String dtoNickname = dto.getNickname();
            Optional<UserEntity> optionalUser = userRepositoryService.findByEmail(dtoEmail);
            if(optionalUser.isPresent()) return SignUpResponseDto.duplicateEmail(); // 이미 가입 이력이 있는 이메일

            optionalUser = userRepositoryService.findByNickname(dtoNickname);
            if(optionalUser.isPresent()) return SignUpResponseDto.duplicateNickname(); // 중복 이메일

            String dtoPassword = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(dtoPassword);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepositoryService.save(userEntity);

        } catch (Exception e){
            e.printStackTrace();
            return SignUpResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }
}
