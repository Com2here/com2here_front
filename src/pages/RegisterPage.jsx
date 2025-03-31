import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import "./RegisterPage.css";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const imgPath = "/images/logo-white.svg";

  return (
    <div className="register-page">
      <Helmet>
        <title>회원가입 - 컴히얼</title>
      </Helmet>
      <div className="register-form-left-side">
        <div className="register-title">회원가입</div>
        <RegisterForm />
      </div>
      <div className="register-right-side">
        <Link to="/">
          <h1 className="register-page-logo">
            <img src={imgPath} alt="컴히얼" />
          </h1>
        </Link>
        <div className="register-description">
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

export default RegisterPage;
