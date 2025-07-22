import "../styles/AdminNav.css";
import "../styles/AdminUserPage.css";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "../constants/routes";

const AdminUserPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  // 더미 회원 데이터
  const dummyUsers = [
    {
      id: 1,
      nickname: "홍길동",
      email: "hong@test.com",
      is_email_verified: true,
      last_login_at: "2024-06-01 10:00:00",
      created_at: "2024-01-01 09:00:00",
      role: "일반회원",
    },
    {
      id: 2,
      nickname: "김관리자",
      email: "admin@test.com",
      is_email_verified: true,
      last_login_at: "2024-06-02 11:30:00",
      created_at: "2023-12-15 14:20:00",
      role: "관리자",
    },
    {
      id: 3,
      nickname: "이회원",
      email: "leeuser@test.com",
      is_email_verified: false,
      last_login_at: "2024-05-20 08:45:00",
      created_at: "2024-02-10 16:10:00",
      role: "일반회원",
    },
  ];

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.nickname.includes(searchTerm) ||
      user.email.includes(searchTerm) ||
      user.role.includes(searchTerm),
  );

  return (
    <div className="admin-page">
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
        <Link
          to={ROUTES.ADMIN.USERS}
          className={`admin-nav-link ${location.pathname === ROUTES.ADMIN.USERS ? "active" : ""}`}
        >
          회원 관리
        </Link>
      </nav>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div className="admin-content">
        <section className="user-search-section">
          <h2>회원 검색</h2>
          <input
            type="text"
            placeholder="이름, 이메일, 역할로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </section>
        <section className="user-list-section">
          <h2>회원 목록</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>닉네임</th>
                <th>이메일</th>
                <th>이메일 인증</th>
                <th>최근 로그인</th>
                <th>가입일</th>
                <th>역할</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nickname}</td>
                    <td>{user.email}</td>
                    <td>{user.is_email_verified ? "인증됨" : "미인증"}</td>
                    <td>{user.last_login_at}</td>
                    <td>{user.created_at}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminUserPage;
