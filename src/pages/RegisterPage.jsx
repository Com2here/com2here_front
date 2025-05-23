import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";
import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const imgPath = "/images/logo-white.svg";

  return (
    <div className="register-page">
      <Helmet>
        <title>{PAGE_TITLES.register}</title>
        <meta property="og:title" content={PAGE_TITLES.register} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.REGISTER}`} />
        <meta name="twitter:title" content={PAGE_TITLES.register}></meta>
        <meta
          name="twitter:url"
          content={`${SITE_URL}${ROUTES.REGISTER}`}
        ></meta>
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
