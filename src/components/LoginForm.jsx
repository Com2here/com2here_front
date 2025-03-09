import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const imgPathKakao = "/images/kakao-logo.svg";
  const imgPathNaver = "/images/naver-logo.svg";
  const imgPathGoogle = "/images/google-logo.svg";

  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

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
        "http://58.238.182.100:9000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // 서버에 JSON 데이터 전송
          },
        }
      );

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
        <button className="login-kakao-btn login-oauth-btn">
          <img
            className="login-kakao-logo"
            src={imgPathKakao}
            alt="카카오 로고"
          />
          <span className="login-kakao-text login-oauth-text">
            카카오로 시작하기
          </span>
        </button>
        <button className="login-naver-btn login-oauth-btn">
          <img
            className="login-naver-logo"
            src={imgPathNaver}
            alt="네이버 로고"
          />
          <span className="login-naver-text login-oauth-text">
            네이버로 시작하기
          </span>
        </button>
        <button className="login-google-btn login-oauth-btn">
          <img
            className="login-google-logo"
            src={imgPathGoogle}
            alt="구글 로고"
          />
          <span className="login-google-text login-oauth-text">
            구글로 시작하기
          </span>
        </button>
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
            <span className="login-find">비밀번호 찾기</span>
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
