import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../hooks/useAxios";
import Joi from "joi";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // 비밀번호 유효성 검사 스키마
  const passwordSchema = Joi.object({
    password: Joi.string()
          .required()
          .pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/,
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

  // 입력값 변경 시 즉시 유효성 검사 실행
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      password: name === "password" ? value : newPassword,
      confirmPassword: name === "confirmPassword" ? value : confirmPassword,
    };
  
    if (name === "password") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  
    const validation = passwordSchema.validate(updatedData, { abortEarly: false });
  
    if (validation.error) {
      const newErrors = {};
      validation.error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  // 이메일 인증 코드 요청
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/v1/email/authcode", {
        mail: email,
      });

      setMessage("인증 코드가 이메일로 전송되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      setMessage("이메일 인증 요청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 비밀번호 재설정 요청
  const handleSubmitPasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 최종 유효성 검사
    const { error } = passwordSchema.validate(
      { password: newPassword, confirmPassword: confirmPassword },
      { abortEarly: false }
    );

    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
      setLoading(false);
      return;
    }

    try {
      await api.post("http://localhost:3000/api/v1/email/password/reset", {
        mail: email,
        code: authCode,
        password: newPassword,
        confirmPassword: confirmPassword,
      });

      setMessage("비밀번호가 성공적으로 재설정되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
      setMessage("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <h2>비밀번호 재설정</h2>

      {!isCodeSent ? (
        <form onSubmit={handleSubmitEmail}>
          <div className="reset-password-input">
            <input
              type="email"
              placeholder="가입한 이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "로딩 중..." : "이메일 인증 코드 보내기"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitPasswordReset}>
          <div className="reset-password-input">
            <input
              type="text"
              placeholder="이메일로 받은 인증 코드를 입력하세요"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              required
            />
          </div>
          <div className="reset-password-input">
            <input
              type="password"
              name="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && <span className="reset-password-error">{errors.password}</span>}
          </div>
          <div className="reset-password-input">
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            {errors.confirmPassword && <span className="reset-password-error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "로딩 중..." : "비밀번호 재설정"}
          </button>
        </form>
      )}

      {message && <div className="reset-password-message">{message}</div>}
    </div>
  );
};

export default ResetPassword;
