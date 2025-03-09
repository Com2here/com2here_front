import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      const response = await axios.post("/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "application/json", // 서버에 JSON 데이터 전송
        },
      });

      console.log("회원가입 성공:", response.data);
      alert("환영합니다!");
      navigate("/login");
    } catch (error) {
      console.log("상태!! ", error.response.status);
      console.error("회원가입 에러:", error);
      alert("회원가입 실패!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="register-input-container">
          <div className="register-input-wrap input-username">
            <input
              name="username"
              placeholder="name"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-wrap input-id">
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-wrap input-password">
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterForm;
