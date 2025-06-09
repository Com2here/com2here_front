import "../styles/HomePage.css";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";

const HomePage = () => {
  const imgPathComputerTower = "/images/computer-tower.png";
  const imgPathLaptop = "/images/laptop.png";

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
          컴퓨터 추천은 여기서
          <br />
          <span>Com, here!</span>
        </h2>
        <div className="home-btn-wrapper">
          <Link to={ROUTES.ESTIMATE}>
            <div className="home-rec-wrapper">
              <img
                className="home-img"
                src={imgPathComputerTower}
                alt="조립PC"
              />
              <button className="home-btn-rec">조립PC 고르기</button>
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
