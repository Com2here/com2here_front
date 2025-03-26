import { useState } from "react";
import axios, { formToJSON } from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 버튼 비활성화
  const [active, setActive] = useState(false);

  const [errors, setErrors] = useState({});

  // Joi 스키마 정의
  const schema = Joi.object({
    username: Joi.string().min(1).max(30).required().messages({
      "string.empty": "",
      // "string.min": "최소 1글자 이상 입력해주세요.",
      "string.max": "30글자 이하로 입력해주세요.",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "",
        "string.email": "유효한 이메일이 아닙니다.",
      }),
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

  const handleChange = (e) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      const validation = schema.validate(updatedData, { abortEarly: false });
      if (validation.error) {
        const errorMessages = {};
        validation.error.details.forEach((detail) => {
          errorMessages[detail.path[0]] = detail.message;
        });
        setErrors(errorMessages);
        console.log(validation.error.details);
        setActive(false);
      } else {
        setErrors({});
        setActive(true);
      }
      return updatedData;
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
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="register-input-container">
          <div className="register-input-wrap input-username">
            <input
              name="username"
              placeholder="이름"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <span className="register-error-message">{errors.username}</span>
            )}
          </div>
          <div className="register-input-wrap input-id">
            <input
              name="email"
              placeholder="이메일"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="register-error-message">{errors.email}</span>
            )}
          </div>
          <div className="register-input-wrap input-password">
            <input
              name="password"
              placeholder="비밀번호"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="register-error-message">{errors.password}</span>
            )}
          </div>
          <div className="register-input-wrap input-password">
            <input
              name="confirmPassword"
              placeholder="비밀번호 확인"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <span className="register-error-message">
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>
        <button
          className={
            active ? "active-register-submit-btn" : "register-submit-btn"
          }
          type="submit"
          disabled={!active}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
