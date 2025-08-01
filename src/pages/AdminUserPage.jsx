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

  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    nickname: "",
    role: "",
    email: "",
    isEmailVerified: false,
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
        err.response?.message || "회원 정보를 불러오는 중 오류가 발생했습니다.";
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
        fetchUsers();
      }
    } catch (err) {
      const errorMessage =
        err.response?.message || "회원 등록 중 오류가 발생했습니다.";
      setError(errorMessage);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({
      nickname: user.nickname || "",
      role: user.role || "",
      email: user.email || "",
      isEmailVerified: user.verified || false,
      profileImageUrl: user.profileImageUrl || "",
    });
    setEditModalOpen(true);
  };

  const handleDeleteUser = async (uuid) => {
    try {
      const response = await api.delete(`/v1/admin/user/${uuid}`);

      if (response.code === 200) {
        setSuccessMessage("회원이 성공적으로 삭제되었습니다.");
        setEditModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      let errorMessage = "회원 삭제 중 오류가 발생했습니다.";
      if (err.response?.code === 401) {
        errorMessage = "인증이 필요합니다.";
      } else if (err.response?.code === 403) {
        errorMessage = "권한이 없습니다.";
      } else if (err.response?.code === 2106) {
        errorMessage = "존재하지 않는 회원입니다.";
      } else if (err.response?.code === 500) {
        errorMessage = "서버 내부 오류가 발생했습니다.";
      }
      setError(errorMessage);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // FormData 객체 생성
      const formData = new FormData();

      // 빈 값은 제외하고 요청 데이터 구성
      if (editFormData.nickname)
        formData.append("nickname", editFormData.nickname);
      if (editFormData.role) formData.append("role", editFormData.role);
      if (editFormData.email) formData.append("email", editFormData.email);
      formData.append("isEmailVerified", editFormData.isEmailVerified);
      if (editFormData.profileImageUrl)
        formData.append("profileImageUrl", editFormData.profileImageUrl);

      const response = await api.patch(
        `/v1/admin/user/${selectedUser.uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.code === 200) {
        setSuccessMessage("회원 정보가 성공적으로 수정되었습니다.");
        setEditModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      let errorMessage = "회원 정보 수정 중 오류가 발생했습니다.";
      if (err.response?.code === 401) {
        errorMessage = "인증이 필요합니다.";
      } else if (err.response?.code === 403) {
        errorMessage = "권한이 없습니다.";
      } else if (err.response?.code === 404) {
        errorMessage = "수정하려는 회원을 찾을 수 없습니다.";
      } else if (err.response?.code === 400) {
        errorMessage = "잘못된 요청입니다. 수정할 필드를 확인해주세요.";
      }
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
                  <th>가입일시</th>
                  <th>최근 로그인 일시</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.uuid}
                      onClick={() => handleEditClick(user)}
                      className="user-row"
                    >
                      <td>{user.uuid}</td>
                      <td>{user.nickname}</td>
                      <td>{user.email}</td>
                      <td>{user.verified ? "인증됨" : "미인증"}</td>
                      {/* <td>{user.profileImageUrl ? "있음" : "없음"}</td> */}
                      <td>{user.role === "ADMIN" ? "관리자" : "일반회원"}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.lastLoginAt}</td>
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

          {editModalOpen && (
            <div className="modal-overlay">
              <div className="edit-modal">
                <div className="modal-header">
                  <h3>회원 정보 수정</h3>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => setEditModalOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label>UUID</label>
                    <input
                      type="text"
                      value={selectedUser.uuid}
                      disabled
                      className="readonly-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>닉네임</label>
                    <input
                      type="text"
                      value={editFormData.nickname}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          nickname: e.target.value,
                        })
                      }
                      placeholder="닉네임"
                    />
                  </div>
                  <div className="form-group">
                    <label>이메일</label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      placeholder="이메일"
                    />
                  </div>
                  <div className="form-group">
                    <label>이메일 인증</label>
                    <select
                      value={editFormData.isEmailVerified}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          isEmailVerified: e.target.value === "true",
                        })
                      }
                    >
                      <option value="true">인증됨</option>
                      <option value="false">미인증</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>권한</label>
                    <select
                      value={editFormData.role}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="">권한 선택</option>
                      <option value="USER">일반회원</option>
                      <option value="ADMIN">관리자</option>
                    </select>
                  </div>
                  {/* <div className="form-group">
                    <label>프로필 이미지 URL</label>
                    <input
                      type="text"
                      value={editFormData.profileImageUrl}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          profileImageUrl: e.target.value,
                        })
                      }
                      placeholder="프로필 이미지 URL"
                    />
                  </div> */}
                  <div className="modal-buttons">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => {
                        if (
                          window.confirm("정말로 이 회원을 삭제하시겠습니까?")
                        ) {
                          handleDeleteUser(selectedUser.uuid);
                        }
                      }}
                    >
                      회원 삭제
                    </button>
                    <button type="submit" className="submit-btn">
                      저장
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
