package com.schedule.project.domain.provider;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Component
@RequiredArgsConstructor
public class EmailProvider {
    private final JavaMailSender javaMailSender;
    private final String SUBJECT = "[Public Scedule] 인증메일입니다.";
    @Value("${spring.mail.username}")
    private String username;
    public boolean sendMail(String email, String randomNumber){

        try{
            String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$"; // 이메일 형식 확인
            Pattern p = Pattern.compile(regex);
            Matcher m = p.matcher(email);
            if(!m.matches()) return false; // 이메일 형식이 아닐 경우
            // MimeMessage 클래스는 이메일의 MIME(Multipurpose Internet Mail Extensions) 형식의 데이터를 표현
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message,true);
            String htmlContent = getCertificationMessage(randomNumber);
            messageHelper.setFrom(username);
            messageHelper.setTo(email);
            messageHelper.setSubject(SUBJECT);
            messageHelper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private String getCertificationMessage(String cfertificationNumber){
        StringBuilder certificationMessage = new StringBuilder();
        certificationMessage.append("<h1 style='text-align: center;'>[Public Scedule] 인증메일</h1>");
        certificationMessage.append("<h3 style='text-align:center;'>인증 코드 : " + cfertificationNumber + "</h3>");
        return certificationMessage.toString();
    }
}