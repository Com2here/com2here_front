import "../styles/PasswordChange.css";

import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../hooks/useAxios.js";

const PasswordChange = () => {
  const navigate = useNavigate();
  const imgPathEye = "/images/eye.svg";
  const imgPathEyeSlash = "/images/eye-slash.svg";

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [active, setActive] = useState(false);

  const passwordSchema = Joi.object({
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).{8,20}$/,
      )
      .messages({
        "string.pattern.base": "영문, 숫자, 특수문자를 포함해주세요.",
        "string.empty": "",
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
        "string.empty": "",
        "any.only": "비밀번호가 일치하지 않습니다.",
      }),
  });

  // 실시간 유효성 검사
  useEffect(() => {
    const { error } = passwordSchema.validate(
      { password: newPwd, confirmPassword: confirmPwd },
      { abortEarly: false },
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
      setActive(false);
    } else {
      setValidationErrors({});
      setActive(true);
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
      const response = await api.patch("/v1/user/password/change", {
        email,
        currentPassword: currentPwd,
        newPassword: newPwd,
        confirmPassword: confirmPwd,
      });

      const responseData = response.data;

      if (responseData.code !== 200) {
        if (responseData.code === 2603) {
          alert("현재 비밀번호가 일치하지 않습니다.");
        } else {
          alert(
            `비밀번호 변경 실패: ${responseData.message || "알 수 없는 오류입니다."}`,
          );
        }
        return;
      }

      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/account");
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  };

  const toggleVisible = (target) => {
    if (target === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (target === "newPassword") {
      setIsNewPasswordVisible(!isNewPasswordVisible);
    } else if (target === "confirmPassword") {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  return (
    <div className="password-change-container">
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="password-change-form">
        <label>
          현재 비밀번호
          <div className="pw-change-input-wrap">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              required
            />
            <div className="pw-change-right">
              <button type="button" onClick={() => toggleVisible("password")}>
                <img
                  src={isPasswordVisible ? imgPathEyeSlash : imgPathEye}
                  alt="비밀번호 보기"
                />
              </button>
            </div>
          </div>
        </label>

        <label>
          새 비밀번호
          <div className="pw-change-input-wrap">
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              required
            />
            <div className="pw-change-right">
              <button
                type="button"
                onClick={() => toggleVisible("newPassword")}
              >
                <img
                  src={isNewPasswordVisible ? imgPathEyeSlash : imgPathEye}
                  alt="비밀번호 보기"
                />
              </button>
            </div>
          </div>
          {validationErrors.password && (
            <div className="error-text">{validationErrors.password}</div>
          )}
        </label>

        <label>
          새 비밀번호 확인
          <div className="pw-change-input-wrap">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              required
            />
            <div className="pw-change-right">
              <button
                type="button"
                onClick={() => toggleVisible("confirmPassword")}
              >
                <img
                  src={isConfirmPasswordVisible ? imgPathEyeSlash : imgPathEye}
                  alt="비밀번호 보기"
                />
              </button>
            </div>
          </div>
          {validationErrors.confirmPassword && (
            <div className="error-text">{validationErrors.confirmPassword}</div>
          )}
        </label>

        <button type="submit" disabled={!active}>
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
