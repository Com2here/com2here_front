import { Helmet } from "react-helmet-async";

import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import "./MylistPage.css";

const MylistPage = () => {
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLES.mylist}</title>
        <meta property="og:title" content={PAGE_TITLES.mylist} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.MYLIST}`} />
        <meta name="twitter:title" content={PAGE_TITLES.mylist}></meta>
        <meta
          name="twitter:url"
          content={`${SITE_URL}${ROUTES.MYLIST}`}
        ></meta>
      </Helmet>
      mylist
    </>
  );
};

export default MylistPage;
