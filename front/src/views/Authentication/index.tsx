import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { SignInRequestDto } from "apis/request/auth";
import { signInRequest } from "apis";
import { SignInResponseDto } from "apis/response/auth";
import { ResponseDto } from "apis/response";
import { MAIN_PATH } from "constant";
import InputBox from "components/InputBox";

//        component: 인증 화면 컴포넌트       //
const Authentication = () => {
  //          state: 화면 상태        //
  // 로그인(sign-in) or 회원가입(sign-up)중 어떤걸 띄워줄지  //
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  //          state: 쿠키 상태        //
  //          setCookie를 사용해 쿠키의 이름, 값,옵션(ex만료시간)을 설정 할 수 있음        //
  const [cookies, setCookie] = useCookies();

  //        function: 네비게이트 함수     //
  //        페이지 간의 전환을 담당 ex) useNavigate('/') => /경로로 이동    //
  const navigate = useNavigate();

  //        component: sign in card 컴포넌트       //
  // ===========================로그인(sign-in) 시작==================================
  const SignInCard = () => {
    // value : emailRef가 참조하는 inputElement가 존재하면 그의 value를 반환. null이면 undefined를 반환. 말고도 type, placeholder, disabled, focus()가 있다.//

    // focus를 위한? //
    // state: 이메일 요소 참조 상태 //
    const emailRef = useRef<HTMLInputElement | null>(null);
    // state: 비밀번호 요소 참조 상태 //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    // 이메일과 비밀번호의 값을 담기 위한? //
    //      state: 이메일 상태        //
    const [email, setEmail] = useState<string>("");
    //      state: 패스워드 상태      //
    const [password, setPassword] = useState<string>("");

    //      state: 패스워드 타입 상태      //
    //      패스워드 가시성을 제어하기 위한(기본적으로 ***.. 아이콘을 누르면 입력한 비밀번호가 보임. 그렇기 때문에 하드코딩으로 password를 입력하지 않고 {passwordType}을 사용해 동적으로 처리)      //
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    );

    //      state: 패스워드 버튼 아이콘 상태      //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");

    //      state: 에러 상태      //
    const [error, setError] = useState<boolean>(false);

    //      회원가입 링크 클릭시 view 값을 "sign-up"으로 변경     //
    const onSignUpLinkClickHandler = () => {
      setView("sign-up");
    };

    //      function: sign in response 처리 함수    //
    const signInResponse = (
      responseBody: SignInResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) {
        alert("네트워크 이상입니다.");
        return;
      }
      const { code } = responseBody;
      if (code === "VF") alert("모두 입력하세요.");
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code === "SF" || code === "VF") setError(true);
      if (code !== "SU") return;

      const { token, expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);
      // 유효시간 : 현재시간 + 백엔드에서 설정한 시간(60분) * 1000
      setCookie("accessToken", token, { expires, path: MAIN_PATH() });
      // 'accessToken' : 이름, token 설정, path : 유효경로(MAIN_PATH() 이하의 모든 경로에서 유효함)
      navigate(MAIN_PATH());
    };

    //      event handler: 로그인 버튼 클릭 이벤트 처리 함수      //
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    };

    //==================이메일에 필요한=======================

    //      event handler: 이메일 변경 이벤트 처리 함수      //

    // input에 value가 있을때랑 없을때랑 스타일 변화를 위한
    const [isEmailNotEmpty, setIsEmailNotEmpty] = useState<boolean>(false);

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setIsEmailNotEmpty(!!value);
      setEmail(value);
    };

    //      event handler: 이메일 인풋 키 다운 이벤트 처리      //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };

    //=====================비밀번호===========================
    //      event handler: 비밀번호 변경 이벤트 처리 함수      //
    // input에 value가 있을때랑 없을때랑 스타일 변화를 위한
    const [isPasswordNotEmpty, setIsPasswordNotEmpty] =
      useState<boolean>(false);

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setIsPasswordNotEmpty(!!value);
      setPassword(value);
    };

    //      event handler: 패스워드 버튼 클릭 이벤트 처리 함수      //
    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };

    //      event handler: 패스워드 인풋 키 다운 이벤트 처리      //
    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      onSignInButtonClickHandler();
    };

    // ===============로그인 button 활성화===============//

    return (
      <div className="root">
        <div className="login_input_box">
          <InputBox
            ref={emailRef}
            label="이메일 주소"
            type="text"
            placeholder="이메일 주소를 입력해주세요."
            error={error}
            value={email}
            onChange={onEmailChangeHandler}
            onKeyDown={onEmailKeyDownHandler}
          />

          <InputBox
            ref={passwordRef}
            label="패스워드"
            type={passwordType}
            placeholder="비밀번호를 입력해주세요."
            error={error}
            value={password}
            onChange={onPasswordChangeHandler}
            icon={passwordButtonIcon}
            onButtonClick={onPasswordButtonClickHandler}
            onKeyDown={onPasswordKeyDownHandler}
          />

          <div className="auth-card-bottom">
            {error && (
              <div className="auth-sign-in-error-box">
                <div className="auth-sign-in-error-message">
                  {
                    "이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요."
                  }
                </div>
              </div>
            )}

            {/* 로그인 버튼 */}
            <div
              className={`login_button_off ${
                isEmailNotEmpty && isPasswordNotEmpty ? "login_button_on" : ""
              }`}
              onClick={
                isEmailNotEmpty && isPasswordNotEmpty
                  ? onSignInButtonClickHandler
                  : undefined
              }
            >
              {"로그인"}
            </div>
          </div>
        </div>

        <div className="access_options">
          <ul>
            <li>
              <a
                className="auth-description-link"
                onClick={onSignUpLinkClickHandler}
              >
                {"회원가입"}
              </a>
            </li>
            <li>
              <a href="#">이메일 찾기</a>
            </li>
            <li>
              <a href="#">비밀번호 찾기</a>
            </li>
          </ul>
        </div>

        <div className="social_login_box">
          <button type="button">
            <img
              src="/assets/image/kakao.PNG"
              className="social_login_image"
              alt="카카오 로그인"
            />
          </button>
          <button type="button">
            <img
              src="/assets/image/naver.PNG"
              className="social_login_image"
              alt="네이버 로그인"
            />
          </button>
          <button type="button">
            <img
              src="/assets/image/google.PNG"
              className="social_login_image"
              alt="구글 로그인"
            />
          </button>
        </div>
      </div>
    );
  };

  // ===========================로그인 끝====================================

  // ===========================회원가입(sign-up) 시작 ================================
  const SignUpCard = () => {
    return (
      <div className="root">
        <div className="join_input_box">
          <form action="">
            <p>이메일</p>
            <input type="text" placeholder="이메일을 입력해주세요." />
            <p>비밀번호</p>
            <input
              type="text"
              placeholder="영어 대소문자,숫자,특수문자 어쩌구 저쩌구"
            />
            <p>비밀번호 확인</p>
            <input type="text" placeholder="비밀번호를 다시 입력 어쩌구" />
            <p>이름</p>
            <input type="text" placeholder="이름 입력 어쩌구" />

            <p>휴대폰 번호</p>
            <div className="certification_box">
              <input type="text" placeholder="숫자만 입력 어쩌구" />
              <button type="submit">인증 요청</button>
            </div>

            <p>인증번호</p>
            <div className="certification_box">
              <input type="text" />
              <button type="submit">인증 확인</button>
            </div>

            <button type="submit" className="join_button">
              가입하기
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div className="main" role="main">
      <div className="auth-logo-icon"></div>

      {view === "sign-in" && <SignInCard />}
      {view === "sign-up" && <SignUpCard />}
    </div>
  );
};

// ===========================회원가입 끝================================

export default Authentication;
