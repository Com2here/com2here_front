import "../styles/MylistPage.css";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { PAGE_TITLES, SITE_URL } from "../constants/constants";
import { ROUTES } from "../constants/routes";

// 임시 mock data
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
  {
    title: "MSI Creator Z16",
    link: "https://shop.example.com/msi-creator",
    image: "https://via.placeholder.com/180x120?text=MSI+Creator",
    lprice: 2399000,
    mallName: "MSI Mall",
  },
];

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="empty-wishlist">찜한 상품이 없습니다.</div>;
  }
  return (
    <div className="product-list-grid">
      {products.map((item) => (
        <div className="product-card" key={item.title}>
          <button
            className="wishlist-btn"
            title="찜 해제"
          >
            <img
              src="/images/heart-angle.svg"
              alt="찜 해제"
              className="heart-icon"
            />
          </button>
          <div className="product-image-wrap">
            <img src={item.image} alt={item.title} className="product-image" />
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
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

const MylistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    } else {
      setWishlist(MOCK_PRODUCTS); // 임시 mock data 사용
    }
  }, []);

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
        <h2 className="product-list-title">찜한 상품</h2>
        <ProductList products={wishlist} />
      </div>
    </>
  );
};

export default MylistPage;
