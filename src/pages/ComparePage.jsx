import "../styles/ComparePage.css";

const ComparePage = () => {
  const computers = [
    {
      id: 1,
      image: "/images/pc1.png",
      specs: {
        CPU: "intel 코어 i5-14500",
        메모리: "삼성 DDR5 PC5-44800 [16GB]",
        그래픽카드: "지포스 GTX 1660 SUPER H7 D6 6GB DUAL",
        SSD: "Gold P31 M.2 NVMe 2280 [500GB TLC]",
        메인보드: "ASUS PRIME B760M-K D4",
        파워: "마이크로닉스 Classic II 700W 80PLUS BRONZE",
        케이스: "ABKO NCORE G30 식스팬 블랙",
      },
      price: "405,678",
    },
    {
      id: 2,
      image: "/images/pc2.png",
      specs: {
        CPU: "intel 코어 i5-14600K",
        메모리: "삼성 DDR5 PC5-44800 [32GB]",
        그래픽카드: "RTX 4060 Ti 벤투스 3X 8G OC",
        SSD: "Samsung 990 PRO M.2 NVMe [1TB]",
        메인보드: "MSI PRO B760M-A WIFI DDR4",
        파워: "ASUS ROG STRIX 850W GOLD",
        케이스: "ABKO NCORE G50 PRO 블랙",
      },
      price: "605,678",
    },
    {
      id: 3,
      image: "/images/pc3.png",
      specs: {
        CPU: "intel 코어 i7-14700K",
        메모리: "삼성 DDR5 PC5-44800 [64GB]",
        그래픽카드: "RTX 4070 Ti GAMING X TRIO 12G",
        SSD: "Samsung 990 PRO M.2 NVMe [2TB]",
        메인보드: "MSI MAG B760M MORTAR WIFI DDR4",
        파워: "ASUS ROG STRIX 1000W PLATINUM",
        케이스: "ABKO NCORE G70 PRO 화이트",
      },
      price: "805,678",
    },
  ];

  return (
    <div className="computer-comparison">
      <div className="breadcrumb">Home {">"} 나의 비교함</div>
      <div className="comparison-container">
        {computers.map((computer) => (
          <div key={computer.id} className="computer-card">
            <div className="image-container">
              <img
                // src={}
                alt="PC 이미지"
                className="computer-image"
              />
              <button className="close-button">✕</button>
            </div>
            <div className="specs-container">
              {Object.entries(computer.specs).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="price-section">
              <div className="heart-icon">
                <img src="/images/heart-angle.svg" alt="찜하기" />
              </div>
              <div className="price-info">
                <span className="price-label">견적가</span>
                <span className="price-value">{computer.price}원</span>
              </div>
              <button className="buy-button">구매하기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePage;
