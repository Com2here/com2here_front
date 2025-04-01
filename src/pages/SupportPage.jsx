import { Helmet } from "react-helmet-async";

import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { ROUTES } from "../constants/routes";

const SupportPage = () => {
  return (
    <div>
      <Helmet>
        <title>{PAGE_TITLES.support}</title>
        <meta property="og:title" content={PAGE_TITLES.support} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.SUPPORT}`} />
        <meta name="twitter:title" content={PAGE_TITLES.support}></meta>
        <meta
          name="twitter:url"
          content={`${SITE_URL}${ROUTES.SUPPORT}`}
        ></meta>
      </Helmet>
      문의하기
    </div>
  );
};

export default SupportPage;
