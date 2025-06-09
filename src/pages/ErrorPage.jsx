import "../styles/ErrorPage.css";

import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import BaseButton from "../components/common/Button/BaseButton";
import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";

const ErrorPage = () => {
  const navigate = useNavigate();

  const title = PAGE_TITLES.error;

  const handleClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="error-page">
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title}></meta>
      </Helmet>
      <BaseButton onClick={handleClick}>BACK HOME</BaseButton>
    </div>
  );
};

export default ErrorPage;
