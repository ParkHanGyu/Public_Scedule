package com.schedule.project.domain.service.implement;

import com.schedule.project.domain.dto.response.schdule.GetMyTeamListResponseDto;
import com.schedule.project.domain.jpa.service.UserTeamRepositoryService;
import com.schedule.project.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserImplement implements UserService {
    private final UserTeamRepositoryService userTeamRepositoryService;

    @Override
    public ResponseEntity<? super GetMyTeamListResponseDto> getMyTeamList(String email){
        List<String> teamNameByUserEmail = new ArrayList<>();
        try{
            teamNameByUserEmail = userTeamRepositoryService.findTeamNameByUserEmail(email);
        }catch (Exception e){
            e.printStackTrace();
            return GetMyTeamListResponseDto.databaseError();
        }
        return GetMyTeamListResponseDto.success(teamNameByUserEmail);
    }
}
