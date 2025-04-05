import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import "./PasswordChangePage.css";

const PasswordChangePage = () => {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const passwordSchema = Joi.object({
    password: Joi.string()
      .required()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/)
      .messages({
        "string.pattern.base": "영문, 숫자, 특수문자를 포함해주세요.",
        "string.empty": "비밀번호를 입력해주세요.",
      })
      .min(8)
      .max(20)
      .messages({
        "string.min": "비밀번호는 최소 8글자 이상 입력해주세요.",
        "string.max": "비밀번호는 최대 20글자 이하로 입력해주세요.",
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "string.empty": "비밀번호 확인을 입력해주세요.",
        "any.only": "비밀번호가 일치하지 않습니다.",
      }),
  });

  // 실시간 유효성 검사
  useEffect(() => {
    const { error } = passwordSchema.validate(
      { password: newPwd, confirmPassword: confirmPwd },
      { abortEarly: false }
    );

    if (error) {
      const errors = {};
      error.details.forEach((err) => {
        if (err.context.key === "password") {
          errors.password = err.message;
        } else if (err.context.key === "confirmPassword") {
          errors.confirmPassword = err.message;
        }
      });
      setValidationErrors(errors);
    } else {
      setValidationErrors({});
    }
  }, [newPwd, confirmPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      alert("입력값을 다시 확인해주세요.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:3000/api/v1/user/password/change", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          currentPassword: currentPwd,
          newPassword: newPwd,
          confirmPassword: confirmPwd,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`비밀번호 변경 실패: ${errorData.message || response.statusText}`);
        return;
      }

      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/account");
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="password-change-container">
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="password-change-form">
        <label>
          현재 비밀번호
          <input
            type="password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            required
          />
        </label>

        <label>
          새 비밀번호
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            required
          />
          {validationErrors.password && (
            <div className="error-text">{validationErrors.password}</div>
          )}
        </label>

        <label>
          새 비밀번호 확인
          <input
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            required
          />
          {validationErrors.confirmPassword && (
            <div className="error-text">{validationErrors.confirmPassword}</div>
          )}
        </label>

        <button type="submit" disabled={Object.keys(validationErrors).length > 0}>
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default PasswordChangePage;
