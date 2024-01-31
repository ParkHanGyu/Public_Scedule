import React from "react";

const DOMAIN = "http://localhost:8081";
const API_DOMAIN = `${DOMAIN}/api/v1`;

// 로그인 요청
// SIGN_IN_URL: 로그인 요청을 보낼 API의 URL을 동적으로 생성하는 함수
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
// 로그인 요청을 보내는 함수
// SignInRequestDto 타입의 requestBody를 받아와 로그인 요청을 보냄

// export const signInRequest = async (requestBody: SignInRequestDto) =>{
//   // await : 응답이 올 때까지 기다리겠다., requestBody: 어떤 데이터를 넣을 것인지
//   const result = await axios.post(SIGN_IN_URL(),requestBody)
//             .then(response => {
//               const responseBody: SignInResponseDto = response.data;
//               return responseBody;
//             })
//             .catch(error=>{
//               if(!error.response.data) return null;
//               const responseBody: ResponseDto = error.response.data;
//               return responseBody;
//             })
//   return result;
// }
