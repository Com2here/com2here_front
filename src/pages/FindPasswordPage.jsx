import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FindPasswordPage.css";

const FindPassword = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 전송 상태를 저장

  const handleChange = (e) => {
    setMail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/email/password/reset", // 이메일 전송 API
        { mail }
      );
      setMessage("비밀번호 재설정 링크가 이메일로 발송되었습니다.");
      setIsEmailSent(true); // 이메일 전송 후 상태 변경
      setLoading(false);
    } catch (error) {
      setMessage("이메일 전송 실패! 다시 시도해주세요.");
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const [password, confirmPassword] = e.target.elements;
    if (password.value !== confirmPassword.value) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/email/password/reset", // 비밀번호 재설정 API
        { mail, password: password.value }
      );
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login"); // 비밀번호 변경 후 로그인 페이지로 리디렉션
    } catch (error) {
      setMessage("비밀번호 변경 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="find-password">
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit}>
        <div className="find-password-input-container">
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={mail}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="find-password-submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "로딩 중..." : "이메일 보내기"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}

      {/* 이메일 인증이 완료되면 비밀번호 재설정 폼을 보여줌 */}
      {isEmailSent && (
        <div className="reset-password-container">
          <h3>새로운 비밀번호 설정</h3>
          <form onSubmit={handleResetPassword}>
            <div className="find-password-input-container">
              <input type="password" placeholder="새로운 비밀번호" required />
            </div>
            <div className="find-password-input-container">
              <input type="password" placeholder="비밀번호 확인" required />
            </div>
            <button
              className="find-password-submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "로딩 중..." : "비밀번호 재설정"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FindPassword;
