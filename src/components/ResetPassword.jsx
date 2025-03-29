import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios import 추가
import api from "../hooks/useAxios"; // 기존 API 인스턴스 사용
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); // 이메일 인증 코드 전송 여부
  const [authCode, setAuthCode] = useState(""); // 사용자가 입력할 인증 코드
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeAuthCode = (e) => setAuthCode(e.target.value);
  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  // 1. 이메일 인증 코드 요청
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/v1/email/authcode", {
        mail: email,
      });

      setMessage("인증 코드가 이메일로 전송되었습니다.");
      setIsCodeSent(true); // 인증 코드 입력창 표시
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      setMessage("이메일 인증 요청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 2. 비밀번호 재설정 요청 (인증 코드 포함)
  const handleSubmitPasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      await api.post("http://localhost:3000/api/v1/email/password/reset", {
        mail: email,
        code: authCode, // 이메일 인증 코드 포함
        password: newPassword,
        confirmPassword : confirmPassword
      });

      setMessage("비밀번호가 성공적으로 재설정되었습니다.");
      navigate("/login"); // 로그인 페이지로 이동
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
        // 1. 이메일 입력 & 인증 코드 전송 버튼
        <form onSubmit={handleSubmitEmail}>
          <div className="reset-password-input">
            <input
              type="email"
              placeholder="가입한 이메일을 입력하세요"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "로딩 중..." : "이메일 인증 코드 보내기"}
          </button>
        </form>
      ) : (
        // 2. 인증 코드 입력 + 비밀번호 재설정
        <form onSubmit={handleSubmitPasswordReset}>
          <div className="reset-password-input">
            <input
              type="text"
              placeholder="이메일로 받은 인증 코드를 입력하세요"
              value={authCode}
              onChange={handleChangeAuthCode}
              required
            />
          </div>
          <div className="reset-password-input">
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={handleChangeNewPassword}
              required
            />
          </div>
          <div className="reset-password-input">
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required
            />
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
