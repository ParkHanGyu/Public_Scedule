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
import { SignInRequestDto, SignUpRequestDto } from "apis/request/auth";
import { signInRequest, signUpRequest } from "apis";
import { SignInResponseDto, SignUpResponseDto } from "apis/response/auth";
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
              <div
                className="auth-description-link"
                onClick={onSignUpLinkClickHandler}
              >
                {"회원가입"}
              </div>
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
    //        state: 페이지 번호 상태       //
    const [page, setPage] = useState<1 | 2>(1);

    //        state: 이메일 요소 참조 상태      //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //        state: 이메일 인증번호 요소 참조 상태      //
    const emailCertifiedRef = useRef<HTMLInputElement | null>(null);

    //        state: 패스워드 요소 참조 상태     //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //        state: 패스워드 확인 요소 참조 상태      //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    //        state: 닉네임 요소 참조 상태      //
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    //        state: 휴대폰 요소 참조 상태      //
    const telNumberRef = useRef<HTMLInputElement | null>(null);

    //        state: 이메일 상태            //
    const [email, setEmail] = useState<string>("");
    //        state: 이메일 인증번호 상태            //
    const [emailCertified, setEmailCertified] = useState<string>("");
    //        state: 패스워드 상태          //
    const [password, setPassword] = useState<string>("");
    //        state: 패스워드 확인 상태          //
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    //        state: 닉네임 상태           //
    const [nickname, setNickname] = useState<string>("");
    //        state: 핸드폰 번호 상태           //
    const [telNumber, setTelNumber] = useState<string>("");
    //        state: 핸드폰 번호 상태           //
    const [telNumberCertified, setTelNumberCertified] = useState<string>("");
    //        state: 주소 상태           //
    const [address, setAddress] = useState<string>("");
    //        state: 상세주소 상태           //
    const [addressDetail, setAddressDetail] = useState<string>("");
    //        state: 개인 정보 동의 상태           //
    const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);
    //        state: 패스워드 타입 상태       //
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    );
    //        state: 패스워드 확인 타입 상태       //
    const [passwordCheckType, setPasswordCheckType] = useState<
      "text" | "password"
    >("password");
    //        state: 이메일 에러 상태       //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    //        state: 패스워드 에러 상태       //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    //        state: 패스워드 확인 에러 상태       //
    const [isPasswordCheckError, setPasswordCheckError] =
      useState<boolean>(false);
    //        state: 닉네임 에러 상태       //
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    //        state: 핸드폰 번호 에러 상태       //
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
    //        state: 주소 에러 상태       //
    const [isAddressError, setAddressError] = useState<boolean>(false);
    //        state: 개인 정보 동의 에러 상태       //
    const [isAgreedPersonalError, setAgreedPersnalError] =
      useState<boolean>(false);

    //        state: 이메일 에러 메세지 상태       //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    //        state: 패스워드 에러 메세지 상태       //
    const [passwordErrorMessage, setPasswordErrorMessage] =
      useState<string>("");
    //        state: 패스워드 확인 에러 메세지 상태       //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
      useState<string>("");
    //        state: 닉네임 에러 메세지 상태       //
    const [nicknameErrorMessage, setNicknameErrorMessage] =
      useState<string>("");
    //        state: 핸드폰 번호 에러 메세지 상태       //
    const [telNumberErrorMessage, setTelNumberErrorMessage] =
      useState<string>("");
    //        state: 주소 에러 메세지 상태       //
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>("");
    //      state: 패스워드 버튼 아이콘 상태      //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");
    //      state: 패스워드 버튼 아이콘 상태      //
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");

    // event handler: 이메일 변경 이벤트 처리     //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmailError(false);
      setEmail(value);
      setEmailErrorMessage("");
    };

    // event handler: 이메일 키 다운 이벤트 처리      //
    const onEmailkeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!emailCertifiedRef.current) return;
      emailCertifiedRef.current.focus();
    };

    // event handler: 이메일 키 다운 이벤트 처리      //
    const onEmailCertifiedkeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };

    // event handler: 패스워드 변경 이벤트 처리     //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordError(false);
      setPassword(value);
      setPasswordErrorMessage("");
    };

    // event handler: 패스워드 버튼 클릭 이벤트 처리      //
    const onPasswordButtonClickHandler = () => {
      if (passwordButtonIcon === "eye-light-off-icon") {
        setPasswordButtonIcon("eye-light-on-icon");
        setPasswordType("text");
      } else {
        setPasswordButtonIcon("eye-light-off-icon");
        setPasswordType("password");
      }
    };

    // event handler: 패스워드 키 다운 이벤트 처리      //
    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };

    // event handler: 패스워드 확인 변경 이벤트 처리     //
    const onPasswordCheckChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = event.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage("");
    };

    // event handler: 패스워드 확인 버튼 클릭 이벤트 처리      //
    const onPasswordCheckButtonClickHandler = () => {
      if (passwordCheckButtonIcon === "eye-light-off-icon") {
        setPasswordCheckButtonIcon("eye-light-on-icon");
        setPasswordCheckType("text");
      } else {
        setPasswordCheckButtonIcon("eye-light-off-icon");
        setPasswordCheckType("password");
      }
    };

    // event handler: 패스워드 확인 키 다운 이벤트 처리      //
    const onPasswordCheckDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
    };

    // event handler: 닉네임 키 다운 이벤트 처리      //
    const onNicknameKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!telNumberRef.current) return;
      telNumberRef.current.focus();
    };

    // event handler: 핸드폰 번호 변경 이벤트 처리      //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMessage("");
    };

    //        function: sign up response 처리 함수       //
    const signUpResponse = (
      responseBody: SignUpResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) {
        alert("네트워크 이상입니다.");
        return;
      }
      const { code } = responseBody;
      if (code === "DE") {
        setEmailError(true);
        setEmailErrorMessage("이미 존재하는 이메일 주소입니다.");
      }
      if (code === "DN") {
        setNicknameError(true);
        setNicknameErrorMessage("이미 존재하는 닉네임입니다.");
      }
      if (code === "DT") {
        setTelNumberError(true);
        setTelNumberErrorMessage("가입된 기록이 있는 핸드폰 번호입니다.");
      }
      if (code === "VF") alert("모든 값을 입력하세요.");
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;
      setView("sign-in");
    };

    // event handler: 회원가입 버튼 클릭 이벤트 처리      //
    const onSignUpButtonClickHandler = () => {
      const hasNickname = nickname.trim().length !== 0;
      if (!hasNickname) {
        setNicknameError(true);
        setNicknameErrorMessage("닉네임을 입력해주세요.");
        nicknameRef.current?.focus();
        return;
      }
      const telNumberPattern = /^[0-9]{11,13}$/;
      const isTelNumberPattern = telNumberPattern.test(telNumber);
      if (!isTelNumberPattern) {
        setTelNumberError(true);
        setTelNumberErrorMessage("숫자를 입력해주세요.");
        telNumberRef.current?.focus();
        return;
      }
      const hasAddress = address.length > 0;
      if (!hasAddress) {
        setAddressError(true);
        setAddressErrorMessage("주소를 선택해주세요.");
      }
      if (!agreedPersonal) setAgreedPersnalError(true);
      if (!hasNickname || !isTelNumberPattern || !agreedPersonal) return;
      const requestBody: SignUpRequestDto = {
        email,
        password,
        nickname,
        telNumber,
        address,
        addressDetail,
        agreedPersonal,
      };
      signUpRequest(requestBody).then(signUpResponse);
    };

    // event handler: 다음 버튼 클릭 이벤트 처리      //
    const onNextButtonClickHandler = () => {
      if (!agreementChecked || !privacyChecked) {
        alert("이용약관과 개인정보 처리 방침에 동의해야 합니다.");
      } else {
        setPage(2);
      }
    };

    //   page의 값이 2일때      //
    useEffect(() => {
      if (page === 2) {
        if (!emailRef.current) return;
        emailRef.current.focus();
      }
    }, [page]);

    // 약관 동의 페이지 //
    const [allChecked, setAllChecked] = useState(false);
    const [agreementChecked, setAgreementChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [marketingChecked, setMarketingChecked] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    // "모두 동의합니다" 체크박스 상태 변경 핸들러
    const handleAllCheckedChange = (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setAllChecked(isChecked);
      setAgreementChecked(isChecked);
      setPrivacyChecked(isChecked);
      setMarketingChecked(isChecked);
      // 필수 항목만 체크되었을 때 버튼 활성화
      setButtonEnabled(isChecked); // 모두 동의할 때 버튼 활성화
    };

    // 각각의 체크박스 상태 변경 핸들러
    // 이용약관 (필수)
    const handleAgreementChange = (event: ChangeEvent<HTMLInputElement>) => {
      setAgreementChecked(event.target.checked);
    };

    // 개인정보 처리 방침 (필수)
    const handlePrivacyChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPrivacyChecked(event.target.checked);
    };

    // 마케팅 정보수신 동의 (선택)
    const handleMarketingChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMarketingChecked(event.target.checked);
    };

    return (
      <div className="root">
        <div className="auth-join-top">
          {page === 1 && (
            <>
              <div>
                <div className="auth-card-title">{"서비스 이용약관"}</div>
                <div className="terms-agreement-page">
                  <div className="terms-agreement-top-checkbox">
                    <div className="checkbox-label">
                      <input
                        type="checkbox"
                        id="agreementCheckboxAll"
                        checked={allChecked}
                        onChange={handleAllCheckedChange}
                      />
                      <label htmlFor="agreementCheckboxAll">
                        모두 동의합니다.
                      </label>
                    </div>
                  </div>

                  <div className="terms-agreement-bottom-checkbox">
                    <div className="terms-agreement-bottom-item">
                      <div className="checkbox-label">
                        <input
                          type="checkbox"
                          id="agreementCheckbox1"
                          checked={agreementChecked}
                          onChange={handleAgreementChange}
                        />
                        <label htmlFor="agreementCheckbox1">
                          이용약관 (필수)
                        </label>
                      </div>
                      <div className="view-link">보기</div>
                    </div>

                    <div className="terms-agreement-bottom-item">
                      <div className="checkbox-label">
                        <input
                          type="checkbox"
                          id="agreementCheckbox2"
                          checked={privacyChecked}
                          onChange={handlePrivacyChange}
                        />
                        <label htmlFor="agreementCheckbox2">
                          개인정보 처리 방침 (필수)
                        </label>
                      </div>
                      <div className="view-link">보기</div>
                    </div>

                    <div className="terms-agreement-bottom-item">
                      <div className="checkbox-label">
                        <input
                          type="checkbox"
                          id="agreementCheckbox3"
                          checked={marketingChecked}
                          onChange={handleMarketingChange}
                        />
                        <label htmlFor="agreementCheckbox3">
                          마케팅 정보수신 동의 (선택)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {page === 2 && (
            <>
              <div className="auth-card-title">{"회원가입"}</div>
              <div className="join_input_box">
                <div className="join-Certified-Input-Box">
                  <InputBox
                    ref={emailRef}
                    label="이메일"
                    type="text"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={onEmailChangeHandler}
                    error={isEmailError}
                    message={emailErrorMessage}
                    onKeyDown={onEmailkeyDownHandler}
                  />
                  <div className="email-certification-btn">
                    {"인증번호 발송"}
                  </div>
                </div>

                <div className="join-Certified-Input-Box">
                  <InputBox
                    ref={emailCertifiedRef}
                    label="인증번호"
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    value={emailCertified}
                    onChange={onEmailChangeHandler}
                    error={isEmailError}
                    message={emailErrorMessage}
                    onKeyDown={onEmailCertifiedkeyDownHandler}
                  />
                  <div className="email-certification-btn">
                    {"인증번호 확인"}
                  </div>
                </div>
                <InputBox
                  ref={passwordRef}
                  label="비밀번호"
                  type={passwordType}
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={onPasswordChangeHandler}
                  error={isPasswordError}
                  message={passwordErrorMessage}
                  icon={passwordButtonIcon}
                  onButtonClick={onPasswordButtonClickHandler}
                  onKeyDown={onPasswordKeyDownHandler}
                />
                <InputBox
                  ref={passwordCheckRef}
                  label="비밀번호 확인"
                  type={passwordCheckType}
                  placeholder="비밀번호를 다시 입력해주세요."
                  value={passwordCheck}
                  onChange={onPasswordCheckChangeHandler}
                  error={isPasswordCheckError}
                  message={passwordCheckErrorMessage}
                  icon={passwordCheckButtonIcon}
                  onButtonClick={onPasswordCheckButtonClickHandler}
                  onKeyDown={onPasswordCheckDownHandler}
                />

                <div className="join-Certified-Input-Box">
                  <InputBox
                    ref={telNumberRef}
                    label="핸드폰 번호"
                    type="text"
                    placeholder="핸드폰 번호를 입력해주세요."
                    value={telNumber}
                    onChange={onTelNumberChangeHandler}
                    error={isTelNumberError}
                    message={telNumberErrorMessage}
                  />
                  <div className="email-certification-btn">
                    {"인증번호 발송"}
                  </div>
                </div>

                <div className="join-Certified-Input-Box">
                  <InputBox
                    ref={telNumberRef}
                    label="인증번호"
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    value={telNumberCertified}
                    onChange={onTelNumberChangeHandler}
                    error={isTelNumberError}
                    message={telNumberErrorMessage}
                  />
                  <div className="email-certification-btn">
                    {"인증번호 확인"}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="auth-join-bottom">
          {page === 1 && (
            <>
              <div
                className={`black-large-full-button ${
                  buttonEnabled ? "" : "disabled"
                }`}
                onClick={onNextButtonClickHandler}
              >
                {"다음"}
              </div>

              <div
                className="auth-cancel-button"
                onClick={onSignUpButtonClickHandler}
              >
                {"취소"}
              </div>
            </>
          )}

          {page === 2 && (
            <>
              <div
                className="auth-join-button"
                onClick={onSignUpButtonClickHandler}
              >
                {"회원가입"}
              </div>

              <div
                className="auth-cancel-button"
                onClick={onSignUpButtonClickHandler}
              >
                {"취소"}
              </div>
            </>
          )}
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
