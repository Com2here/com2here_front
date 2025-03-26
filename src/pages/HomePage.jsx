import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import "./HomePage.css";

const HomePage = () => {
  const imgPathPc = "/images/pc.svg";
  const imgPathLaptop = "/images/laptop.svg";

  return (
    <main className="home-page">
      <Helmet>
        <title>{PAGE_TITLES.home}</title>
        <meta property="og:title" content={PAGE_TITLES.home} />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:title" content={PAGE_TITLES.home}></meta>
        <meta name="twitter:url" content={SITE_URL}></meta>
      </Helmet>
      <section className="home-cover">
        <h2 className="home-cover-text">
          컴퓨터/노트북 추천은 여기서
          <br />
          Com, here!
        </h2>
        <div className="home-btn-wrapper">
          <Link to={"/estimate"}>
            <div className="home-rec-wrapper">
              <img className="home-img" src={imgPathPc} alt="컴퓨터" />
              <button className="home-btn-rec">컴퓨터 고르기</button>
            </div>
          </Link>
          <div className="home-rec-wrapper">
            <img className="home-img" src={imgPathLaptop} alt="노트북" />
            <button className="home-btn-rec">노트북 고르기</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
