import "../styles/AdminProductPage.css";
import "../styles/AdminNav.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "../constants/routes";

const AdminProductPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 더미 데이터
  const dummyProducts = [
    {
      id: 1,
      name: "고성능 게이밍 PC",
      image: "/images/computer-tower.png",
      specs: {
        CPU: "intel 코어 i5-14500",
        메모리: "삼성 DDR5 PC5-44800 [16GB]",
        그래픽카드: "지포스 RTX 4060 VENTUS 3X 8G OC D6",
        SSD: "삼성전자 PM9A1 M.2 NVMe [500GB]",
        메인보드: "ASUS PRIME B760M-K D4",
        파워: "마이크로닉스 Classic II 700W 80PLUS BRONZE",
        케이스: "ABKO NCORE G30 식스팬 블랙",
      },
      price: 1250000,
    },
    {
      id: 2,
      name: "프리미엄 워크스테이션",
      image: "/images/computer-tower.png",
      specs: {
        CPU: "intel 코어 i7-13700K",
        메모리: "삼성 DDR4-3200 [32GB]",
        그래픽카드: "지포스 RTX 4070 GAMING X TRIO 12G",
        SSD: "삼성전자 990 PRO M.2 NVMe [1TB]",
        메인보드: "MSI PRO B660M-A DDR4",
        파워: "시소닉 FOCUS GOLD GM-850 Full Modular",
        케이스: "darkFlash DLX21 RGB MESH 강화유리",
      },
      price: 2150000,
    },
    {
      id: 3,
      name: "최고사양 게이밍 PC",
      image: "/images/computer-tower.png",
      specs: {
        CPU: "intel 코어 i9-13900KS",
        메모리: "삼성 DDR5-5600 [64GB]",
        그래픽카드: "지포스 RTX 4080 SUPRIM X D6X 16GB",
        SSD: "삼성전자 990 PRO M.2 NVMe [2TB]",
        메인보드: "ASUS ROG STRIX Z790-A GAMING WIFI D4",
        파워: "ASUS ROG THOR P2 Gaming 1000W Platinum",
        케이스: "ASUS ROG STRIX HELIOS GX601",
      },
      price: 4350000,
    },
  ];

  useEffect(() => {
    // 초기 로딩 시 전체 상품 목록 표시
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  }, []);

  // 검색어가 변경될 때마다 상품 필터링
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = products.filter((product) => {
      // 상품명 검색
      if (product.name.toLowerCase().includes(searchTermLower)) return true;

      // 스펙 정보 검색
      const specs = Object.values(product.specs);
      return specs.some((spec) => spec.toLowerCase().includes(searchTermLower));
    });

    setFilteredProducts(filtered);
    setSuccessMessage(
      filtered.length > 0 ? `${filtered.length}개의 상품을 찾았습니다.` : "",
    );
  }, [searchTerm, products]);

  const fetchProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSuccessMessage("상품 정보를 성공적으로 불러왔습니다.");
      } else {
        throw new Error("상품을 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message || "상품 정보를 불러오는데 실패했습니다.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-product-page">
      <h1>관리자 페이지</h1>

      <nav className="admin-nav">
        <Link
          to={ROUTES.ADMIN.SOFTWARE}
          className={`admin-nav-link ${location.pathname === ROUTES.ADMIN.SOFTWARE ? "active" : ""}`}
        >
          소프트웨어 사양 관리
        </Link>
        <Link
          to={ROUTES.ADMIN.PRODUCTS}
          className={`admin-nav-link ${location.pathname === ROUTES.ADMIN.PRODUCTS ? "active" : ""}`}
        >
          상품 정보 관리
        </Link>
      </nav>

      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="admin-product-content">
        <section className="product-search-section">
          <h2>상품 검색</h2>
          <div className="product-search-form">
            <div className="form-group">
              <label htmlFor="searchTerm">검색어</label>
              <div className="search-input-group">
                <input
                  type="text"
                  id="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="상품명 또는 부품명으로 검색"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="product-details-section">
          <h2>상품 목록</h2>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => fetchProduct(product.id)}
              >
                <div className="image-container">
                  <img
                    src={product.image}
                    alt="상품 이미지"
                    className="computer-image"
                  />
                </div>
                <div className="specs-container">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key">{key}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="price-section">
                  <div className="price-info">
                    <span className="price-label">판매가</span>
                    <span className="price-value">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="no-product">검색 결과가 없습니다.</p>
          )}

          {product && (
            <div className="product-details-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>{product.name}</h3>
                  <button
                    className="close-button"
                    onClick={() => setProduct(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="product-details">
                  <div className="product-image">
                    <img src={product.image} alt="상품 이미지" />
                  </div>
                  <div className="product-info">
                    <div className="info-group">
                      <h3>기본 정보</h3>
                      <p>
                        <strong>상품 ID:</strong> {product.id}
                      </p>
                      <p>
                        <strong>가격:</strong> {product.price.toLocaleString()}
                        원
                      </p>
                    </div>
                    <div className="specs-group">
                      <h3>상세 스펙</h3>
                      <div className="specs-grid">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="spec-item">
                            <span className="spec-label">{key}</span>
                            <span className="spec-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminProductPage;
