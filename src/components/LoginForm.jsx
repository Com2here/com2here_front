import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 로그인 함수 가져오기

  const imgPathKakao = "/images/kakao-logo.svg";
  const imgPathNaver = "/images/naver-logo.svg";
  const imgPathGoogle = "/images/google-logo.svg";

  const handleFindPassword = () => {
    navigate("/find-password"); // 비밀번호 찾기 페이지로 이동
  };

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (code) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/callback/kakao?code=${code}`
      );
      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setIsAuthenticated(true);
        navigate("/"); // ✅ 로그인 성공 후 메인 페이지로 이동
      } else {
        console.error("로그인 실패:", data);
      }
    } catch (error) {
      console.error("카카오 로그인 처리 에러:", error);
    }
  };

  // 카카오 로그인 URL 받아서 이동
  const getLoginUrl = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/login/kakao/url"
      );
      window.location.href = response.data.url; // 카카오 로그인 페이지로 이동
      console.log(window.location.href);
    } catch (error) {
      console.error("카카오 로그인 URL 가져오기 에러:", error);
    }
  };

  // 카카오 로그인 후 리디렉션 처리
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      handleLogin(code);
    }

    console.log("Kakao Authorization Code:", code); // 추가
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        formData
      );

      console.log("응답 데이터:", response.data); // 응답 데이터 전체 확인

      // 응답 데이터에서 토큰 추출
      const accessToken = response.data.data?.accessToken;
      const refreshToken = response.data.data?.refreshToken;

      if (accessToken && refreshToken) {
        // JWT 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("로그인 성공:", response.data);
        alert("로그인 성공!");
        login();
        navigate("/"); // 로그인 후 리다이렉션
      } else {
        throw new Error("토큰이 응답에 포함되어 있지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패!");
    }
  };

  return (
    <div className="login-form">
      <fieldset className="login-oauth">
        {/* 카카오 로그인 버튼 */}
        <a className="login-kakao-btn login-oauth-btn" onClick={getLoginUrl}>
          <img
            className="login-kakao-logo"
            src={imgPathKakao}
            alt="카카오 로고"
          />
          <span className="login-kakao-text login-oauth-text">
            카카오로 시작하기
          </span>
        </a>

        <a className="login-naver-btn login-oauth-btn" onClick={getLoginUrl}>
          <img
            className="login-naver-logo"
            src={imgPathNaver}
            alt="네이버 로고"
          />
          <span className="login-naver-text login-oauth-text">
            네이버로 시작하기
          </span>
        </a>

        <a className="login-google-btn login-oauth-btn" onClick={getLoginUrl}>
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-feat">
            <div className="login-remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">로그인 상태 유지</label>
            </div>
            <span className="login-find" onClick={handleFindPassword}>
              비밀번호 찾기
            </span>
          </div>
        </div>
        <button className="login-submit-btn" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
