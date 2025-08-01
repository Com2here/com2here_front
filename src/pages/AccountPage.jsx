import "../styles/AccountPage.css";

import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";

import ProfileEdit from "../components/ProfileEdit";
import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";

const AccountPage = () => {
  return (
    <div className="account-page">
      <Helmet>
        <title>{PAGE_TITLES.account}</title>
        <meta property="og:title" content={PAGE_TITLES.account} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.ACCOUNT}`} />
        <meta name="twitter:title" content={PAGE_TITLES.account}></meta>
        <meta
          name="twitter:url"
          content={`${SITE_URL}${ROUTES.ACCOUNT}`}
        ></meta>
      </Helmet>
      <Routes>
        <Route path="/profile" element={<ProfileEdit />}></Route>
      </Routes>
    </div>
  );
};

export default AccountPage;
