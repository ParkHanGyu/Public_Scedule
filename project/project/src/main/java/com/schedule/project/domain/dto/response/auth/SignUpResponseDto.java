package com.schedule.project.domain.dto.response.auth;


import com.schedule.project.domain.common.ResponseCode;
import com.schedule.project.domain.common.ResponseMessage;
import com.schedule.project.domain.dto.ResponseDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Setter @Getter
public class SignUpResponseDto extends ResponseDto {
    private SignUpResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<SignUpResponseDto> success(){ // 성공
        return ResponseEntity.status(HttpStatus.OK).body(new SignUpResponseDto());
    }

    public static ResponseEntity<ResponseDto> duplicateEmail(){ // 이메일 중복
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.DUPLICATE_EMAIL,ResponseMessage.DUPLICATE_EMAIL));
    }

    public static ResponseEntity<ResponseDto> duplicateNickname(){ // 닉네임 중복
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.DUPLICATE_NICKNAME,ResponseMessage.DUPLICATE_NICKNAME));
    }

}
