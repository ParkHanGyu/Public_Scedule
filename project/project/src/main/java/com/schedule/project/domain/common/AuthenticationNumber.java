package com.schedule.project.domain.common;

public class AuthenticationNumber {
    public static String getAuthenticationNumber(){
        StringBuilder stringBuilder = new StringBuilder();
        for(int i=0;i<6;i++){
            stringBuilder.append((int) (Math.random() * 10));
        }
        return stringBuilder.toString();
    }
}
