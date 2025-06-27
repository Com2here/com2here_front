import "../styles/EstimatePage.css";

import { useState } from "react";
import { Helmet } from "react-helmet-async";

import BaseButton from "../components/common/Button/BaseButton";
import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import { GAMES } from "../constants/software";
import { useAuth } from "../contexts/AuthContext";
import { useRecs } from "../hooks/useRecs";

const MOCK_PRODUCTS = [
  {
    title: "Dell XPS Desktop",
    link: "https://shop.example.com/dell-xps",
    image: "https://via.placeholder.com/180x120?text=Dell+XPS",
    lprice: 1699000,
    mallName: "Dell 공식몰",
  },
  {
    title: "HP Pavilion Laptop",
    link: "https://shop.example.com/hp-pavilion",
    image: "https://via.placeholder.com/180x120?text=HP+Pavilion",
    lprice: 899000,
    mallName: "HP Mall",
  },
  {
    title: "Apple iMac 24",
    link: "https://shop.example.com/imac-24",
    image: "https://via.placeholder.com/180x120?text=iMac+24",
    lprice: 1699000,
    mallName: "Apple Store",
  },
  {
    title: "LG 울트라PC",
    link: "https://shop.example.com/lg-ultra",
    image: "https://via.placeholder.com/180x120?text=LG+UltraPC",
    lprice: 1099000,
    mallName: "LG전자몰",
  },
  {
    title: "삼성 갤럭시북",
    link: "https://shop.example.com/galaxybook",
    image: "https://via.placeholder.com/180x120?text=Galaxy+Book",
    lprice: 1299000,
    mallName: "삼성전자몰",
  },
  {
    title: "Lenovo ThinkPad",
    link: "https://shop.example.com/thinkpad",
    image: "https://via.placeholder.com/180x120?text=ThinkPad",
    lprice: 999000,
    mallName: "Lenovo Mall",
  },
];

function ProductResultScreen({ products, onBack }) {
  return (
    <div className="product-result-screen">
      <h2 className="product-list-title">추천 상품</h2>
      <div className="product-list-grid">
        {products.map((item) => (
          <div className="product-card" key={item.title}>
            <button className="wishlist-btn" title="견적 담기">
              <img
                src="/public/images/heart-angle.svg"
                alt="관심 담기"
                className="heart-icon"
              />
            </button>
            <div className="product-image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-title">{item.title}</div>
              <div className="product-mall">{item.mall || item.mallName}</div>
              <div className="product-price">
                {(item.price || item.lprice).toLocaleString()}원
              </div>
            </div>
            <div className="product-actions">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-deal-btn"
              >
                상품 보러가기
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="back-btn" onClick={onBack}>
        다시 선택하기
      </button>
    </div>
  );
}

const EstimatePage = () => {
  const [budget, setBudget] = useState(100);
  const [selectedGames, setSelectedGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn, userInfo } = useAuth();
  const { loading, error, recommendations, getRecommendations } = useRecs();
  const [showProducts, setShowProducts] = useState(false);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = async () => {
    if (selectedGames.length === 0) {
      alert("최소 하나의 게임을 선택해주세요.");
      return;
    }

    setShowProducts(true);

    try {
      const purpose = "게임용";
      const programs = selectedGames;
      const budgetInWon = budget * 10000; // 만원 단위를 원 단위로 변환
      await getRecommendations(purpose, programs, budgetInWon);
      console.log("추천 결과:", recommendations);
    } catch (err) {
      console.error("추천 요청 실패:", err);
    }
  };

  const handleBack = () => {
    setShowProducts(false);
  };

  // 게임 검색 필터링
  const filteredGames = Object.values(GAMES).filter((game) =>
    game.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (showProducts) {
    if (!recommendations) {
      return (
        <div className="loading-message">추천 결과를 불러오는 중입니다...</div>
      );
    }
    return (
      <ProductResultScreen products={recommendations} onBack={handleBack} />
    );
  }

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
          <div className="game-search-container">
            <input
              type="text"
              placeholder="게임을 검색해보세요..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="game-search-input"
            />
            {searchTerm && (
              <div className="search-results-info">
                {filteredGames.length}개의 게임이 검색되었습니다
              </div>
            )}
          </div>
          <div className="games-grid">
            {filteredGames.map((game) => (
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
          {filteredGames.length === 0 && searchTerm && (
            <div className="no-results">
              &ldquo;{searchTerm}&rdquo;에 대한 검색 결과가 없습니다.
            </div>
          )}
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

        <BaseButton onClick={handleClick} disabled={loading}>
          {loading ? "추천 중..." : "나에게 딱 맞는 조립PC 찾기"}
        </BaseButton>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default EstimatePage;
