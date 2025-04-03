import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountDeletePage.css";
import { Helmet } from "react-helmet-async";
import SideBar from "../components/SideBar.jsx";

const AccountDeletePage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(""); // 사용자 입력 받을 상태

  const handleDelete = async () => {
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (!window.confirm("정말 계정을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }), // 백엔드에서 UserRequestDto로 받을 데이터
      });

      const result = await response.json();
      if (result.isSuccess) {
        alert("계정이 삭제되었습니다.");
        navigate("/");
      } else {
        alert(`삭제 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
      alert("서버 오류로 계정 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="account-page-container">
      <SideBar />
      <div className="account-content">
        <h2>계정 삭제</h2>
        <p>계정을 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?</p>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <div className="button-group">
          <button className="delete-button" onClick={handleDelete}>삭제하기</button>
          <button className="cancel-button" onClick={() => navigate("/account")}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletePage;
