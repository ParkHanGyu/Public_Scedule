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
import SignInResponseDto from "apis/response/auth/sign-in.response.dto";
import InputBox from "components/InputBox";

const Authentication = () => {
  // 로그인(sign-in) or 회원가입(sign-up)중 어떤걸 띄워줄지  //
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  //          setCookie를 사용해 쿠키의 이름, 값,옵션(ex만료시간)을 설정 할 수 있음        //
  const [cookies, setCookie] = useCookies();

  //        페이지 간의 전환을 담당 ex) useNavigate('/') => /경로로 이동    //
  const navigate = useNavigate();

  // ===========================로그인(sign-in) 시작==================================
  const SignInCard = () => {
    // value : emailRef가 참조하는 inputElement가 존재하면 그의 value를 반환. null이면 undefined를 반환. 말고도 type, placeholder, disabled, focus()가 있다.//

    // focus를 위한? //
    // emailRef : 이메일 요소 참조 상태 //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //      passwordRef : 패스워드 요소 참조 상태        //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    // 이메일과 비밀번호의 값을 담기 위한? //
    //      state: 이메일 상태        //
    const [email, setEmail] = useState<string>("");
    //      state: 패스워드 상태      //
    const [password, setPassword] = useState<string>("");

    //      패스워드 가시성을 제어하기 위한(기본적으로 ***.. 아이콘을 누르면 입력한 비밀번호가 보임. 그렇기 때문에 하드코딩으로 password를 입력하지 않고 {passwordType}을 사용해 동적으로 처리)      //
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    );

    //      패스워드 입력칸 버튼 아이콘 상태      //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");

    //      state: 에러 상태      //
    const [error, setError] = useState<boolean>(false);

    //      회원가입 링크 클릭시 view 값을 "sign-up"으로 변경     //
    const onSignUpLinkClickHandler = () => {
      setView("sign-up");
    };

    const [value, setValue] = useState<string>("");

    return (
      <div className="root">
        <div className="login_input_box">
          <form action="">
            <InputBox
              label="이메일"
              type="text"
              placeholder="이메일 주소를 입력해주세요"
              value={value}
              error={false}
              setValue={setValue}
              message="aaaa"
            />
            <p>이메일</p>
            <input type="text" placeholder="이메일을 입력해주세요." />

            <p>비밀번호</p>
            <input
              type="password"
              placeholder="영어 대소문자,숫자,특수문자 어쩌구 저쩌구"
            />

            <button className="login_button" type="submit">
              로그인
            </button>
          </form>
        </div>

        <hr />

        <div className="access_options">
          <ul>
            <li>
              <a onClick={onSignUpLinkClickHandler}>회원가입</a>
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
