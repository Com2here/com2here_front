import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./LoginPage.css";

import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const imgPath = "/images/logo-white.svg";

  return (
    <div className="login-page">
      <Helmet>
        <title>로그인 - 컴히얼</title>
      </Helmet>
      <div className="login-form-left-side">
        <h1 className="login-page-text">로그인</h1>
        <LoginForm />
        <div className="login-register">
          아직 가입하지 않으셨나요?
          <span className="login-register-link">
            <Link to="/register">회원가입</Link>
          </span>
        </div>
      </div>
      <div className="login-form-right-side">
        <Link to="/">
          <h1 className="login-page-logo">
            <img src={imgPath} alt="컴히얼" />
          </h1>
        </Link>
        <div className="login-description">
          <p>
            컴알못에게 가장 쉬운
            <br />
            PC추천 플랫폼
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
