import "../styles/RegisterPage.css";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";
import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";

const RegisterPage = () => {
  const imgPath = "/images/logo.svg";

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
        <Link to={ROUTES.HOME}>
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
