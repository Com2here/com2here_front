import "../styles/AdminNav.css";
import "../styles/AdminUserPage.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import api from "../hooks/useAxios";

const AdminUserPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    nickname: "",
    password: "",
    email: "",
    role: "USER",
    profileImageUrl: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/v1/admin/user?page=${currentPage}&size=${pageSize}&sort=createdAt,asc`,
      );
      if (response.code === 200) {
        setUsers(response.data.content);
        setError(null);
      }
    } catch (err) {
      const errorMessage =
        err.response?.message ||
        "회원 정보를 불러오는 중 오류가 발생했습니다.";
      setError(errorMessage);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize]);

  const filteredUsers = users.filter(
    (user) =>
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/v1/admin/user/create", newUser);

      if (response.code === 200) {
        setSuccessMessage("회원이 성공적으로 등록되었습니다.");
        setNewUser({
          nickname: "",
          password: "",
          email: "",
          role: "USER",
          profileImageUrl: "",
        });
        setShowAddUserForm(false);
        // TODO: Refresh user list
      }
    } catch (err) {
      const errorMessage =
        err.response?.message || "회원 등록 중 오류가 발생했습니다.";
      setError(errorMessage);
    }
  };

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
          <div className="search-header">
            <h2>회원 검색</h2>
            <button
              className="add-user-btn"
              onClick={() => setShowAddUserForm(!showAddUserForm)}
            >
              {showAddUserForm ? "등록 취소" : "회원 등록"}
            </button>
          </div>
          {showAddUserForm && (
            <form onSubmit={handleSubmit} className="add-user-form">
              <div className="form-group">
                <input
                  type="text"
                  name="nickname"
                  value={newUser.nickname}
                  onChange={handleInputChange}
                  placeholder="닉네임"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="이메일"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호"
                  required
                />
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="USER">일반회원</option>
                  <option value="ADMIN">관리자</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="profileImageUrl"
                  value={newUser.profileImageUrl}
                  onChange={handleInputChange}
                  placeholder="프로필 이미지 URL (선택사항)"
                />
              </div>
              <button type="submit" className="submit-btn">
                회원 등록
              </button>
            </form>
          )}
          <input
            type="text"
            placeholder="이름, 이메일, 권한 등으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </section>
        <section className="user-list-section">
          <h2>회원 목록</h2>
          {loading ? (
            <div className="loading">데이터를 불러오는 중...</div>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>UUID</th>
                  <th>닉네임</th>
                  <th>이메일</th>
                  <th>이메일 인증</th>
                  {/* <th>프로필 이미지</th> */}
                  <th>권한</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.uuid}>
                      <td>{user.uuid}</td>
                      <td>{user.nickname}</td>
                      <td>{user.email}</td>
                      <td>{user.verified ? "인증됨" : "미인증"}</td>
                      {/* <td>{user.profileImageUrl ? "있음" : "없음"}</td> */}
                      <td>{user.role === "ADMIN" ? "관리자" : "일반회원"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      {error ? error : "검색 결과가 없습니다."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0 || loading}
            >
              이전
            </button>
            <span>페이지 {currentPage + 1}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={users.length < pageSize || loading}
            >
              다음
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminUserPage;
