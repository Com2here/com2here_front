import "../styles/AdminSoftwarePage.css";
import "../styles/AdminNav.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import api from "../hooks/useAxios";

const AdminSoftwarePage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const initialFormData = {
    purpose: "",
    mainProgram: "",
    recommendedSpec: "",
    minimumSpec: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [searchTerm, filterBy]);

  useEffect(() => {
    fetchRecommendations(pagination.currentPage);
  }, [pagination.currentPage]);

  const getEnumFromFilter = (value) => {
    switch (value) {
      case "gaming":
        return "게임용";
      case "work":
        return "작업용";
      case "office":
        return "사무용";
      case "development":
        return "개발용";
      default:
        return "";
    }
  };

  const fetchRecommendations = async (page = 1) => {
    setLoading(true);
    try {
      const purposeFilter = getEnumFromFilter(filterBy);
      const response = await api.get(`/v1/admin/program/show`, {
        params: {
          page: page,
          limit: pagination.itemsPerPage,
          search: searchTerm,
          purpose: purposeFilter,
        },
      });

      const { content, pageNumber, totalPages, totalElements, pageSize } =
        response.data;

      setRecommendations(content);

      setPagination((prev) => {
        if (
          prev.currentPage === page &&
          prev.totalPages === totalPages &&
          prev.totalItems === totalElements &&
          prev.itemsPerPage === pageSize
        ) {
          return prev;
        }
        return {
          ...prev,
          totalPages,
          totalItems: totalElements,
          itemsPerPage: pageSize,
        };
      });
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(
        err.response?.message || "소프트웨어 목록을 불러오는데 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (recommendation) => {
    setEditingId(recommendation.id);
    setFormData({
      purpose: recommendation.purpose,
      mainProgram: recommendation.mainProgram,
      recommendedSpec: recommendation.recommendedSpec,
      minimumSpec: recommendation.minimumSpec,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setSuccessMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말로 이 소프트웨어 정보를 삭제하시겠습니까?")) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/v1/admin/program/delete/${id}`);
      setSuccessMessage("소프트웨어 정보가 성공적으로 삭제되었습니다.");
      fetchRecommendations(pagination.currentPage);
    } catch (err) {
      setError(err.response?.message || "삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const payload = {
      mainProgram: formData.mainProgram,
      recommendedSpec: formData.recommendedSpec,
      minimumSpec: formData.minimumSpec,
      purpose: formData.purpose,
    };

    try {
      if (editingId) {
        await api.patch(`/v1/admin/program/update/${editingId}`, payload);
        setSuccessMessage("소프트웨어 정보가 성공적으로 수정되었습니다.");
        setEditingId(null);
      } else {
        await api.post("/v1/admin/program/add", payload);
        setSuccessMessage("새 소프트웨어 정보가 성공적으로 등록되었습니다.");
      }

      setFormData(initialFormData);
      fetchRecommendations(pagination.currentPage);
    } catch (err) {
      setError(err.response?.message || "처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      pagination.currentPage - Math.floor(maxVisiblePages / 2),
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1,
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="pagination-ellipsis">
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${pagination.currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="pagination-ellipsis">
            ...
          </span>,
        );
      }
      pages.push(
        <button
          key={pagination.totalPages}
          onClick={() => handlePageChange(pagination.totalPages)}
          className="pagination-button"
        >
          {pagination.totalPages}
        </button>,
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        >
          이전
        </button>
        {pages}
        <button
          className="pagination-button"
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
        >
          다음
        </button>
      </div>
    );
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
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
        <section className="recommendations-form-section">
          <h2>{editingId ? "소프트웨어 정보 수정" : "새 소프트웨어 등록"}</h2>
          <form onSubmit={handleSubmit} className="recommendation-form">
            <div className="form-group">
              <label htmlFor="purpose">용도</label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              >
                <option value="">용도를 선택하세요</option>
                <option value="게임용">게임용</option>
                <option value="작업용">작업용</option>
                <option value="사무용">사무용</option>
                <option value="개발용">개발용</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mainProgram">소프트웨어명</label>
              <input
                type="text"
                id="mainProgram"
                name="mainProgram"
                value={formData.mainProgram}
                onChange={handleChange}
                required
                placeholder="예: LOL"
              />
            </div>

            <div className="form-group">
              <label htmlFor="recommendedSpec">권장 사양</label>
              <input
                type="text"
                id="recommendedSpec"
                name="recommendedSpec"
                value={formData.recommendedSpec}
                onChange={handleChange}
                required
                placeholder="예: i7, 32GB RAM"
              />
            </div>

            <div className="form-group">
              <label htmlFor="minimumSpec">최소 사양</label>
              <input
                type="text"
                id="minimumSpec"
                name="minimumSpec"
                value={formData.minimumSpec}
                onChange={handleChange}
                required
                placeholder="예: i5, 16GB RAM"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {editingId ? "수정하기" : "등록하기"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  취소
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="recommendations-list-section">
          <h2>소프트웨어 목록</h2>

          <div className="recommendations-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="용도, 소프트웨어, 사양으로 검색..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            <div className="filter-box">
              <select
                value={filterBy}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="all">전체 보기</option>
                <option value="gaming">게임용</option>
                <option value="work">작업용</option>
                <option value="office">사무용</option>
                <option value="development">개발용</option>
              </select>
            </div>
          </div>

          {recommendations.length > 0 ? (
            <>
              <div className="recommendations-list">
                {recommendations.map((rec) => (
                  <div key={rec.program} className="recommendation-item">
                    <div className="recommendation-content">
                      <h3>{rec.program}</h3>
                      <div className="recommendation-details">
                        <p>
                          <strong>용도 분류:</strong> {rec.purpose}
                        </p>
                        <p>
                          <strong>사양 등급:</strong> {rec.specLevel}
                        </p>
                        <p>
                          <strong>권장 사양:</strong>{" "}
                          {JSON.stringify(rec.recSpec)}
                        </p>
                        <p>
                          <strong>최소 사양:</strong>{" "}
                          {JSON.stringify(rec.minSpec)}
                        </p>
                      </div>
                    </div>
                    <div className="recommendation-actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(rec)}
                      >
                        수정
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(rec.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {renderPagination()}
              <div className="pagination-info">
                총 {pagination.totalItems}개 중{" "}
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}-
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems,
                )}
                개 표시
              </div>
            </>
          ) : (
            <p className="no-recommendations">
              {searchTerm || filterBy !== "all"
                ? "검색 조건에 맞는 소프트웨어 정보가 없습니다."
                : "등록된 소프트웨어 정보가 없습니다."}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminSoftwarePage;
