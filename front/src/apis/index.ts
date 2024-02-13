import React from "react";
import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponseDto } from "./response";

const DOMAIN = "http://localhost:8081";
const API_DOMAIN = `${DOMAIN}/api/v1`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

// 로그인 요청
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
export const signInRequest = async (requestBody: SignInRequestDto) => {
  try {
    const response = await axios.post(SIGN_IN_URL(), requestBody);
    const responseBody: SignInResponseDto = response.data;
    return responseBody; // 이 부분을 추가해주세요.
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    } else {
      console.error("서버 응답에 문제가 있습니다.", error);
      return null;
    }
  }
};

// 회원가입 요청
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then((response) => {
      const responseBody: SignUpResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
