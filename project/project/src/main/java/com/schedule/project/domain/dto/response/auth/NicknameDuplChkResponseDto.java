package com.schedule.project.domain.dto.response.auth;

import com.schedule.project.domain.common.ResponseCode;
import com.schedule.project.domain.common.ResponseMessage;
import com.schedule.project.domain.dto.ResponseDto;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
public class NicknameDuplChkResponseDto extends ResponseDto {
    public NicknameDuplChkResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<? super NicknameDuplChkResponseDto> success(){
        NicknameDuplChkResponseDto responseBody = new NicknameDuplChkResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicateNickname(){ // 중복 닉네임
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_NICKNAME,ResponseMessage.DUPLICATE_NICKNAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
