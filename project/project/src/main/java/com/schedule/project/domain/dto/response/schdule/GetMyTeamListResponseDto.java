package com.schedule.project.domain.dto.response.schdule;

import com.schedule.project.domain.common.ResponseCode;
import com.schedule.project.domain.common.ResponseMessage;
import com.schedule.project.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetMyTeamListResponseDto extends ResponseDto {
    private List<String> teamList;

    public GetMyTeamListResponseDto(List<String> teamList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.teamList = teamList;
    }

    public static ResponseEntity<? super GetMyTeamListResponseDto> success(List<String> teamList){
        return ResponseEntity.status(HttpStatus.OK).body(new GetMyTeamListResponseDto(teamList));
    }

}
