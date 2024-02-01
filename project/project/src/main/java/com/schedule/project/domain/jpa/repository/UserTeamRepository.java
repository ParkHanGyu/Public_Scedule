package com.schedule.project.domain.jpa.repository;

import com.schedule.project.domain.jpa.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserTeamRepository extends JpaRepository<UserTeam,Long> {

    @Query("select t.name from UserTeam ut " +
            " join ut.user u " +
            " join ut.team t " +
            " where u.email =:email")
    List<String> findTeamNameByUserEmail(@Param("email") String email);
}
