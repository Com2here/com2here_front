import { Helmet } from "react-helmet-async";

import ProfileEdit from "../components/ProfileEdit";
import SideBar from "../components/Sidebar";
import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import "../styles/AccountPage.css";

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
      <SideBar />
      <ProfileEdit />
    </div>
  );
};

export default AccountPage;
