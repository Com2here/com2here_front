import "../styles/EstimatePage.css";

import PropTypes from "prop-types";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import BaseButton from "../components/common/Button/BaseButton";
import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import { GAMES } from "../constants/software";
import { useAuth } from "../contexts/AuthContext";
import { useRecs } from "../hooks/useRecs";
import { useWishlist } from "../hooks/useWishlist";

const SORT_OPTIONS = [
  { label: "가격 낮은 순", value: "price_asc" },
  { label: "가성비 좋은 순", value: "score_price_ratio" },
];

ProductResultScreen.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number,
      lprice: PropTypes.number,
      mall: PropTypes.string,
      mallName: PropTypes.string,
    }),
  ).isRequired,
  onBack: PropTypes.func.isRequired,
};

function ProductResultScreen({ products, onBack }) {
  const [sortOption, setSortOption] = useState("price_asc");
  // const { addToWishlist, isInWishlist } = useWishlist();
  const [wishlistItems, setWishlistItems] = useState({}); // 관심상품 상태를 객체로 관리
  const { addToWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // const handleAddToWishlist = async (product) => {
  //   if (!isLoggedIn) {
  //     alert("로그인이 필요한 서비스입니다.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const result = await addToWishlist(product.id);
  //     if (result.success) {
  //       alert("관심상품에 추가되었습니다.");
  //     } else {
  //       alert(result.error);
  //     }
  //   } catch (error) {
  //     console.error("위시리스트 추가 실패:", error);
  //     alert("관심상품 추가에 실패했습니다.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // 관심상품 추가 시 토글
  const handleAddToWishlist = (product, index) => {
    // product.id가 없는 경우 title과 index를 조합하여 고유 키 생성
    const itemKey = product.id || `${product.title}-${index}`;
    
    setWishlistItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  // 정렬 함수
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price_asc") {
      return (a.price || a.lprice) - (b.price || b.lprice);
    } else if (sortOption === "score_price_ratio") {
      const aRatio = (a.totalScores || 0) / (a.price || a.lprice || 1);
      const bRatio = (b.totalScores || 0) / (b.price || b.lprice || 1);
      return bRatio - aRatio; // 가성비 높은 순
    }
    return 0;
  });

  return (
    <div className="product-result-screen">
      <div className="sort-select-wrapper">
        <label>정렬:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <h2 className="product-list-title">추천 상품</h2>
      <div className="product-list-grid">
        {sortedProducts.map((item, index) => (
          <div className="product-card" key={item.id || `${item.title}-${index}`}>
            <button
              className={`wishlist-btn ${wishlistItems[item.id || `${item.title}-${index}`] ? 'active' : ''}`}
              title={wishlistItems[item.id || `${item.title}-${index}`] ? "관심상품 해제" : "관심상품 담기"}
              onClick={() => handleAddToWishlist(item, index)}
              disabled={isLoading}
            >
              <img
                src={wishlistItems[item.id || `${item.title}-${index}`] ? "/images/heart-angle-filled.svg" : "/images/heart-angle.svg"}
                alt={wishlistItems[item.id || `${item.title}-${index}`] ? "관심상품 해제" : "관심상품 담기"}
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
          {filteredGames.length > 0 && (
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
          )}
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
