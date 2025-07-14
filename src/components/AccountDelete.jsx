import "../styles/AccountDelete.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ACCOUNT_DELETE_ERROR_MESSAGES } from "../constants/errors";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";

const AccountDelete = () => {
  const imgPathEye = "/images/eye.svg";
  const imgPathEyeSlash = "/images/eye-slash.svg";

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

      if (response.code === 200) {
        alert("계정이 삭제되었습니다.");
        logout();
        navigate(ROUTES.HOME);
      } else {
        alert(
          `삭제 실패: ${ACCOUNT_DELETE_ERROR_MESSAGES[response.code] || "알 수 없는 오류"}`,
        );
        if (
          response.code === 2002 ||
          response.code === 2005 ||
          response.code === 2106
        ) {
          logout();
          navigate(ROUTES.LOGIN);
        }
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
      alert("알 수 없는 오류로 계정 삭제에 실패했습니다.");
    }
  };

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="account-delete-container">
      <h2>계정 삭제</h2>
      <p>계정을 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?</p>
      <div className="account-delete-input-password">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="account-delete-pw-right">
          <button type="button" onClick={togglePassword}>
            <img
              src={isPasswordVisible ? imgPathEyeSlash : imgPathEye}
              alt="비밀번호 보기"
            />
          </button>
        </div>
      </div>
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

export default AccountDelete;
