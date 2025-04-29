import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AccountDeletePage.css";
import api from "../hooks/useAxios";

const AccountDeletePage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { logout } = useAuth();

  const handleDelete = async () => {
    if (!password.trim()) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (!window.confirm("정말 계정을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await api.delete("/v1/user/delete", {
        data: { password },
      });

      const result = response.data;
      console.log("서버 응답:", result);

      if (result.code === 200) {
        alert("계정이 삭제되었습니다.");
        logout();
        navigate("/");
      } else {
        alert(`삭제 실패: ${result.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
      alert("서버 오류로 계정 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="account-delete-container">
      <h2>계정 삭제</h2>
      <p>계정을 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?</p>
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-group">
        <button className="delete-button" onClick={handleDelete}>
          삭제하기
        </button>
        <button className="cancel-button" onClick={() => navigate("/account")}>
          취소
        </button>
      </div>
    </div>
  );
};

export default AccountDeletePage;
