package com.schedule.project.domain.dto.response;

import com.schedule.project.domain.common.ResponseCode;
import com.schedule.project.domain.common.ResponseMessage;
import com.schedule.project.domain.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class EmailAuthResponseDto extends ResponseDto { // 인증 번호 요청
    public EmailAuthResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<? super EmailAuthResponseDto> success(){
        EmailAuthResponseDto responseBody = new EmailAuthResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicateEmail(){ // 중복 이메일
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_EMAIL,ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> mailSendFail(){ // 메일 발송 실패
        ResponseDto responseBody = new ResponseDto(ResponseCode.MAIL_FAIL,ResponseMessage.MAIL_FAIL);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
