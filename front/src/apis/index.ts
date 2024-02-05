import axios from "axios";
import SignInRequestDto from "./request/auth/sign-in-request.dto";
import { SignInResponseDto } from "./response/auth";
import { ResponseDto } from "./response";

const DOMAIN = "http://localhost:8081";
const API_DOMAIN = `${DOMAIN}/api/v1`;

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
