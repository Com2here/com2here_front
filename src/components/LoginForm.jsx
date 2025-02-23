import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://58.238.182.100:9000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // 서버에 JSON 데이터 전송
          },
        }
      );

      console.log("로그인 성공:", response.data);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login-input-container">
          <div className="login-input-wrap input-id">
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-input-wrap input-password">
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
