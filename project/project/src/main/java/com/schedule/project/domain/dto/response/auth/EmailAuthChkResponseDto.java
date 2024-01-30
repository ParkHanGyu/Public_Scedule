package com.schedule.project.domain.dto.response.auth;

import com.schedule.project.domain.common.ResponseCode;
import com.schedule.project.domain.common.ResponseMessage;
import com.schedule.project.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class EmailAuthChkResponseDto extends ResponseDto {

    private String email;
    public EmailAuthChkResponseDto(String email) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = email;
    }
    public static ResponseEntity<EmailAuthChkResponseDto> success(String email){
        EmailAuthChkResponseDto responseBody = new EmailAuthChkResponseDto(email);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> validationFailEmail(){ // 유효하지 않은 이메일
        ResponseDto responseBody = new ResponseDto(ResponseCode.VALIDATION_FAIL, ResponseMessage.VALIDATION_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicateEmail(){ // 이메일 중복
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_EMAIL, ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }



}
