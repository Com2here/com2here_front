import "../styles/TermsPage.css";

import { useLocation } from "react-router-dom";

import { TERMS_CONTENT } from "../constants/terms";

// 약관 종류별 제목 반환 함수
const getTitle = (key) => {
  switch (key) {
    case "age":
      return "연령 동의";
    case "terms":
      return "서비스 이용약관";
    case "privacy":
      return "개인정보 처리방침";
    default:
      return "약관";
  }
};

// 쿼리스트링 파싱 함수
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TermsPage = () => {
  const query = useQuery();
  const type = query.get("type") || "terms";
  const content = TERMS_CONTENT[type] || "약관 내용을 불러올 수 없습니다.";

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">컴히얼 약관 및 개인정보 보호</h1>
      </div>
      <div className="terms-content">
        <h2 className="terms-section-title">연령 동의</h2>
        <pre className="terms-text">{TERMS_CONTENT["age"]}</pre>
        <hr className="terms-divider" />
        <h2 className="terms-section-title">서비스 이용약관</h2>
        <pre className="terms-text">{content}</pre>
        <hr className="terms-divider" />
        <h2 className="terms-section-title" id="privacy-section">
          개인정보 처리방침
        </h2>
        <pre className="terms-text">{TERMS_CONTENT["privacy"]}</pre>
      </div>
    </div>
  );
};

export default TermsPage;
