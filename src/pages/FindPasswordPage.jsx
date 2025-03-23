import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FindPasswordPage.css";

const FindPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/forgot-password",
        { email }
      );
      setMessage("비밀번호 재설정 링크가 이메일로 발송되었습니다.");
      setLoading(false);
    } catch (error) {
      setMessage("이메일 전송 실패! 다시 시도해주세요.");
      setLoading(false);
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
            value={email}
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
    </div>
  );
};

export default FindPassword;
