import "../styles/MylistPage.css";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import api from "../hooks/useAxios";

const WishlistResultScreen = ({ products, onRemove }) => {
  if (!products || products.length === 0) {
    return <div className="empty-wishlist">관심 상품이 없습니다.</div>;
  }

  return (
    <div className="product-list-grid">
      {products.map((item, index) => {
        console.log("wishlist item:", item);
        return (
          <div
            className="product-card"
            key={item.productId || `${item.title}-${index}`}
          >
            <button
              className="wishlist-btn"
              title="찜 해제"
              onClick={() => onRemove(item.productId)}
            >
              <img
                src="/images/heart-angle-filled.svg"
                alt="관심상품"
                className="heart-icon"
              />
            </button>
            <div className="product-image-wrap">
              <img
                src={item.image}
                alt={item.title || item.specs?.cpu || "PC 사양"}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-title">{item.title || "title"}</div>
              <div className="product-mall">{item.mall || "mall"}</div>
              <div className="product-price">
                {(item.price || item.lprice).toLocaleString()}원
              </div>
            </div>
            <div className="product-actions">
              <a
                href={item.link || `/products/${item.productId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-deal-btn"
              >
                상품 보러가기
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

WishlistResultScreen.propTypes = {
  products: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const MylistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get("/v1/product/wish/list");

        if (response.code === 200) {
          setWishlist(response.data.products);
        } else {
          setError(response.message || "관심 상품을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        if (err.response?.message) {
          setError(err.response.message);
        } else {
          setError("서버와의 통신 중 오류가 발생했습니다.");
        }
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveWishlist = async (productId) => {
    if (!window.confirm("이 상품을 관심 목록에서 삭제하시겠습니까?")) return;

    try {
      console.log("삭제 요청:", productId);
      await api.delete(`/v1/product/wish/delete/${productId}`);
      setWishlist((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLES.mylist}</title>
        <meta property="og:title" content={PAGE_TITLES.mylist} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.MYLIST}`} />
        <meta name="twitter:title" content={PAGE_TITLES.mylist}></meta>
        <meta name="twitter:url" content={`${SITE_URL}${ROUTES.MYLIST}`}></meta>
      </Helmet>
      <div className="mylist-container">
        <h2 className="product-list-title">관심 상품</h2>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <WishlistResultScreen
            products={wishlist}
            onRemove={handleRemoveWishlist}
          />
        )}
      </div>
    </>
  );
};

export default MylistPage;
