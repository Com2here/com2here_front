import "../styles/EstimatePage.css";

import { useState } from "react";
import { Helmet } from "react-helmet-async";

import BaseButton from "../components/common/Button/BaseButton";
import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import { GAMES } from "../constants/software";

const EstimatePage = () => {
  const [budget, setBudget] = useState(100);
  const [selectedGames, setSelectedGames] = useState([]);

  const handleGameSelect = (game) => {
    setSelectedGames((prev) => {
      if (prev.includes(game)) {
        return prev.filter((g) => g !== game);
      }

      if (prev.length >= 5) {
        alert("최대 5개까지 선택 가능합니다.");
        return prev;
      }

      return [...prev, game];
    });
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setBudget(value);
  };

  const handleClick = () => {
    // navigate(ROUTES.HOME);
  };

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
        <section className="estimate-pc-usage">
          <h2>주로 플레이하실 게임을 선택해주세요</h2>
          <div className="games-grid">
            {Object.values(GAMES).map((game) => (
              <label key={game} className="game-item">
                <input
                  type="checkbox"
                  checked={selectedGames.includes(game)}
                  onChange={() => handleGameSelect(game)}
                />
                {game}
              </label>
            ))}
          </div>
        </section>

        {selectedGames.length > 0 && (
          <section className="selected-programs">
            <h3>선택된 게임 ({selectedGames.length}/5)</h3>
            <div className="selected-programs-list">
              {selectedGames.map((game) => (
                <div key={game} className="selected-program-item">
                  {game}
                  <button
                    className="remove-program"
                    onClick={() => handleGameSelect(game)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="estimate-budget-section">
          <div className="estimate-pc-budget-header">
            <span className="estimate-pc-title">예산은 얼마인가요?</span>
          </div>
          <div className="budget-input-container">
            <div className="budget-input-group">
              <input
                type="number"
                min="0"
                value={budget}
                onChange={handleBudgetChange}
                className="budget-input"
              />
              <span className="budget-unit">만원</span>
            </div>
          </div>
        </section>

        <BaseButton onClick={handleClick}>나에게 딱 맞는 조립PC 찾기</BaseButton>

        {/* {selectedGames.length > 0 ? (
          <section className="pc-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="pc-card">
                <div className="pc-image">PC 추천 {item}</div>
                <div className="pc-actions">
                  <button className="buy-button">구매하기</button>
                  <button className="wishlist-button">+ 관심등록</button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section>
            <p>주로 플레이하실 게임을 하나 이상 선택해주세요</p>
          </section>
        )} */}
      </div>
    </div>
  );
};

export default EstimatePage;
