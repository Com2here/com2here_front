import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios"; // Axios 인스턴스 가져오기
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const imgPathKakao = "/images/kakao-logo.svg";
  const imgPathNaver = "/images/naver-logo.svg";
  const imgPathGoogle = "/images/google-logo.svg";

  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [loading, setLoading] = useState(false); // 로딩
  // const [error, setError] = useState(null); // 에러
  // const [kakaoLoginUrl, setKakaoLoginUrl] = useState(""); // url유지
  // const [naverLoginUrl, setNaverLoginUrl] = useState("");
  // const [googleLoginUrl, setGoogleLoginUrl] = useState("");

  const { login } = useAuth(); // 로그인 함수 가져오기

  const handleFindPassword = () => {
    navigate("/reset-password");
  };

  const getLoginUrl = async (platform) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/login/${platform}/url`
      );
      window.location.href = response.data.url; // 백엔드에서 받은 URL로 이동
    } catch (error) {
      console.error(`${platform} 로그인 URL 가져오기 에러:`, error);
    }
  };

  const getKakaoLoginUrl = () => getLoginUrl("kakao");
  const getNaverLoginUrl = () => getLoginUrl("naver");
  const getGoogleLoginUrl = () => getLoginUrl("google");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError(null);

    try {
      const response = await api.post("v1/user/login", formData);
      // console.log(response.data);

      login({
        token: {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        },
        user: {
          username: response.data.username,
          email: response.data.email,
        },
      });

      console.log("로그인 성공:", response.data);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패!");
    }
  };

  return (
    <div className="login-form">
      <fieldset className="login-oauth">
        {/* 카카오 로그인 버튼 */}
        <a
          className="login-kakao-btn login-oauth-btn"
          onClick={getKakaoLoginUrl}
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
          onClick={getNaverLoginUrl}
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
          onClick={getGoogleLoginUrl}
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
            <span
              className="login-find"
              onClick={handleFindPassword}
            >
              비밀번호를 잊어버리셨나요?
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
