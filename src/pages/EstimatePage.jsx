import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import "./EstimatePage.css";

const EstimatePage = () => {
  const [budget, setBudget] = useState(50);

  return (
    <div className="estimate-page">
      <Helmet>
        <title>{PAGE_TITLES.estimate}</title>
        <meta property="og:title" content={PAGE_TITLES.estimate} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.ESTIMATE}`} />
        <meta name="twitter:title" content={PAGE_TITLES.estimate}></meta>
        <meta
          name="twitter:url"
          content={`${SITE_URL}${ROUTES.ESTIMATE}`}
        ></meta>
      </Helmet>
      <div className="estimate-container">
        <div className="estimate-pc-categories">
          <p>이용 프로그램</p>
          <button className="estimate-category selected">게임</button>
          <button className="estimate-category">2D 영상</button>
          <button className="estimate-category">개발</button>
          <button className="estimate-category">사무용</button>
        </div>

        <div className="estimate-budget-section">
          <span className="budget-label">예산</span>
          <input
            type="range"
            min="0"
            max="100"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="custom-slider"
          />
        </div>

        <div className="pc-list">
          {[1, 2, 3].map((item) => (
            <div key={item} className="pc-card">
              <div className="pc-image">PC 추천 {item}</div>
              <div className="pc-actions">
                <button className="buy-button">구매하기</button>
                <button className="wishlist-button">+ 관심등록</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;
