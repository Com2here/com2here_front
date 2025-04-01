import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import SideBar from "../components/Sidebar";
import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="myPage">
      <Helmet>
        <title>{PAGE_TITLES.mypage}</title>
        <meta property="og:title" content={PAGE_TITLES.mypage} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.MYPAGE}`} />
        <meta name="twitter:title" content={PAGE_TITLES.mypage}></meta>
        <meta name="twitter:url" content={`${SITE_URL}${ROUTES.MYPAGE}`}></meta>
      </Helmet>
      <section className="myPage-location">
        <div className="myPage-inner-wrap">
          <div className="myPage-location-text">
            Home &gt; <Link to="/mypage">나의 컴퓨터</Link>
          </div>
        </div>
      </section>

      <div className="myPage-inner-wrap">
        <div className="container">
          <SideBar />
          <div className="mypage-contents">
            <main className="mycomputer">
              <section className="mycomputer-info">
                user-info <br /> 프로필 편집 버튼으로 계정 설정 페이지로 이동
              </section>
              <div className="mycomputer-container">
                <section className="mycomputer-favor">user-favor</section>
                <section className="mycomputer-need">user-need</section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
