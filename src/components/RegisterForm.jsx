import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import api from "../hooks/useAxios";
import { REGISTER_ERROR_MESSAGES } from "../constants/errors";
import "../styles/RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const imgPathEye = "/images/eye.svg";
  const imgPathEyeSlash = "/images/eye-slash.svg";

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 이메일 인증 모달 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 입력값
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const schema = Joi.object({
    nickname: Joi.string().min(1).max(30).required().messages({
      "string.empty": "",
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
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?~]).{8,20}$/,
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
        setActive(false);
      } else {
        setErrors({});
        // setActive(isEmailVerified);
        setActive(true);
      }
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("v1/user/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const code = response.data.code;
      console.log(response.data);

      if (code === 200) {
        // 회원가입 성공 후 이메일 인증 코드 전송
        await handleEmailVerification();
        setIsModalOpen(true);
      } else if (code in REGISTER_ERROR_MESSAGES) {
        alert(REGISTER_ERROR_MESSAGES[code]);
        return;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { code, message } = error.response.data;
        alert("회원가입 실패!");
      } else {
        console.error("회원가입 에러:", error);
        alert("회원가입 실패!");
      }
    }
  };

  const handleEmailVerification = async () => {
    try {
      const response = await api.post("v1/email/authcode", {
        mail: formData.email,
      });

      console.log("이메일 인증 코드 전송 성공:", response.data);
      alert("이메일로 인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error("이메일 인증 코드 전송 실패:", error);
      alert("이메일 인증 코드 전송 실패");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await api.post("v1/email/verify", {
        mail: formData.email,
        verifyCode: verificationCode,
      });

      console.log("이메일 인증 성공:", response.data);
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
      setIsModalOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      alert("이메일 인증 실패");
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const toggleVisible = (target) => {
    if (target === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (target === "confirmPassword") {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="register-input-container">
          <div className="register-input-wrap input-nickname">
            <input
              name="nickname"
              placeholder="사용자 이름"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            {errors.nickname && (
              <span className="register-error-message">{errors.nickname}</span>
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
          {/* {!isEmailVerified && (
            <button
              type="button"
              onClick={handleEmailVerification}
              disabled={emailSent}
            >
              {emailSent ? "이메일 전송 완료" : "이메일 인증하기"}
            </button>
          )} */}
          <div className="register-input-wrap input-password">
            <div>
              <input
                name="password"
                placeholder="비밀번호"
                type={isPasswordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="register-pw-right">
                <button type="button" onClick={() => toggleVisible("password")}>
                  <img
                    src={isPasswordVisible ? imgPathEyeSlash : imgPathEye}
                    alt="비밀번호 보기"
                  />
                </button>
              </div>
            </div>
            {errors.password && (
              <span className="register-error-message">{errors.password}</span>
            )}
          </div>
          <div className="register-input-wrap input-password">
            <div>
              <input
                name="confirmPassword"
                placeholder="비밀번호 확인"
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="register-pw-right">
                <button
                  type="button"
                  onClick={() => toggleVisible("confirmPassword")}
                >
                  <img
                    src={
                      isConfirmPasswordVisible ? imgPathEyeSlash : imgPathEye
                    }
                    alt="비밀번호 보기"
                  />
                </button>
              </div>
            </div>
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

      {/* 이메일 인증 모달 */}
      {isModalOpen && !isEmailVerified && (
        <div className="email-verification-modal">
          <button className="modal-close-btn" onClick={handleModalClose}>
            ×
          </button>
          <h3>이메일 인증</h3>
          <p>이메일로 인증 코드를 전송했습니다. 코드를 입력해주세요.</p>
          <input
            type="text"
            placeholder="인증 코드"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>인증하기</button>
          <button onClick={handleEmailVerification}>
            이메일 인증 코드 재전송
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
