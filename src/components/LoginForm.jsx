import "../styles/LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_ERROR_MESSAGES } from "../constants/errors";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios"; // Axios 인스턴스 가져오기

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 로그인 함수 가져오기

  const imgPathKakao = "/images/kakao-logo.svg";
  const imgPathNaver = "/images/naver-logo.svg";
  const imgPathGoogle = "/images/google-logo.svg";
  const imgPathEye = "/images/eye.svg";
  const imgPathEyeSlash = "/images/eye-slash.svg";

  const handleFindPassword = () => {
    navigate(ROUTES.HELP.FIND_PW); // 비밀번호 찾기 페이지로 이동
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true); // 이메일 인증 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 이메일 인증 모달 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 입력값
  const [rememberMe, setRememberMe] = useState(false); // 로그인 유지 체크박스 상태

  const handleRememberMeChange = (e) => {
    const checked = e.target.checked;
    setRememberMe(checked);
    if (checked) {
      alert(
        "개인정보 보호를 위해 본인 기기에서만 사용해 주세요. 이 기능을 이용함으로써 발생하는 보안 문제의 책임은 본인에게 있습니다.",
      );
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      const response = await api.get(`v1/oauth/${provider}`);
      if (response.code === 200) {
        window.location.href = response.data;
      }
    } catch (error) {
      alert("소셜 로그인 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 이메일 인증 코드 전송
  const handleEmailVerification = async () => {
    try {
      const response = await api.post("v1/email/authcode", {
        mail: formData.email,
      });

      console.log("이메일 인증 코드 전송 성공:", response);
      alert("이메일로 인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error("이메일 인증 코드 전송 실패:", error);
      alert("이메일 인증 코드 전송 실패");
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    try {
      const response = await api.post("v1/email/verify", {
        mail: formData.email,
        verifyCode: verificationCode,
      });

      console.log("이메일 인증 성공:", response);
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
      setIsModalOpen(false);

      // 인증 완료 후 로그인 처리
      alert("로그인 성공!");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      alert("이메일 인증 실패");
    }
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 일반 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("v1/user/login", formData);

      if (response.status === 200) {
        // 이메일 인증 상태 확인
        const isEmailVerified = response.data.is_email_verified;

        if (isEmailVerified === 0) {
          // 이메일 인증이 필요한 경우
          setIsEmailVerified(false);
          setIsModalOpen(true);
          // 자동으로 코드 전송하지 않음
        } else {
          // 이메일 인증이 완료된 경우 바로 로그인
          // rememberMe가 true면 localStorage, 아니면 sessionStorage에 저장
          const { accessToken, refreshToken } = response.data;
          if (rememberMe) {
            localStorage.setItem("refreshToken", refreshToken);
          } else {
            sessionStorage.setItem("refreshToken", refreshToken);
          }
          login({
            token: {
              accessToken: accessToken,
              // refreshToken: refreshToken,
            },
            user: {
              nickname: response.data.nickname,
              email: response.data.email,
              role: response.data.role,
            },
          });
          alert("로그인 성공!");
          navigate(ROUTES.HOME);
        }
      }
    } catch (error) {
      const errorCode = error.response?.code;
      const errorMessage =
        LOGIN_ERROR_MESSAGES[errorCode] || "알 수 없는 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="login-form">
      <fieldset className="login-oauth">
        {/* 카카오 로그인 버튼 */}
        <a
          className="login-kakao-btn login-oauth-btn"
          onClick={() => handleOAuthLogin("kakao")}
        >
          <img
            className="login-kakao-logo"
            src={imgPathKakao}
            alt="카카오 로고"
          />
          <span className="login-kakao-text login-oauth-text">
            카카오로 시작하기
          </span>
        </a>

        <a
          className="login-naver-btn login-oauth-btn"
          onClick={() => handleOAuthLogin("naver")}
        >
          <img
            className="login-naver-logo"
            src={imgPathNaver}
            alt="네이버 로고"
          />
          <span className="login-naver-text login-oauth-text">
            네이버로 시작하기
          </span>
        </a>

        <a
          className="login-google-btn login-oauth-btn"
          onClick={() => handleOAuthLogin("google")}
        >
          <img
            className="login-google-logo"
            src={imgPathGoogle}
            alt="구글 로고"
          />
          <span className="login-google-text login-oauth-text">
            구글로 시작하기
          </span>
        </a>
      </fieldset>

      <div className="login-divider">
        <div className="login-divider-design"></div>
        <span className="login-divider-text">또는</span>
        <div className="login-divider-design"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="login-input-container">
          <div className="login-input-wrap input-id">
            <input
              name="email"
              placeholder="이메일"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-input-wrap input-password">
            <input
              placeholder="비밀번호"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="login-pw-right">
              <button type="button" onClick={togglePassword}>
                <img
                  src={isPasswordVisible ? imgPathEyeSlash : imgPathEye}
                  alt="비밀번호 보기"
                />
              </button>
            </div>
          </div>
          <div className="login-feat">
            <div className="login-remember">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember">로그인 상태 유지</label>
            </div>
            <span className="login-find" onClick={handleFindPassword}>
              비밀번호를 잊어버리셨나요?
            </span>
          </div>
        </div>
        <button className="login-submit-btn" type="submit">
          로그인
        </button>
      </form>

      {/* 이메일 인증 모달 */}
      {isModalOpen && !isEmailVerified && (
        <div className="email-verification-modal">
          <button className="modal-close-btn" onClick={handleModalClose}>
            ×
          </button>
          <h3>이메일 인증</h3>
          <p>이메일 인증 후 로그인 가능합니다.</p>
          <button onClick={handleEmailVerification}>인증 코드 전송</button>
          <input
            type="text"
            placeholder="인증 코드"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>인증하기</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
