import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Joi from "joi";
import api from "../hooks/useAxios";
import { ROUTES } from "../constants/routes";
import { Helmet } from "react-helmet-async";
import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { FIND_PW_ERROR_MESSAGES } from "../constants/errors";
import "../styles/FindPwPage.css";

const FindPwPage = () => {
  const navigate = useNavigate();
  const imgPathEye = "/images/eye.svg";
  const imgPathEyeSlash = "/images/eye-slash.svg";
  const imgPath = "/images/logo-white.svg";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); // 전송 상태 저장
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [errors, setErrors] = useState({});
  const [active, setActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // 비밀번호 유효성 검사 스키마
  const passwordSchema = Joi.object({
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

  // 입력값 변경 시 즉시 유효성 검사 실행
  const handleCheckPassword = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      password: name === "password" ? value : newPassword,
      confirmPassword: name === "confirmPassword" ? value : confirmPassword,
    };

    if (name === "password") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);

    const validation = passwordSchema.validate(updatedData, {
      abortEarly: false,
    });

    if (validation.error) {
      const newErrors = {};
      validation.error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      setActive(false);
    } else {
      setErrors({});
      setActive(true);
    }
  };

  // 이메일 인증 코드 요청
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/v1/email/authcode", {
        mail: email,
      });

      // 응답 코드가 200인 경우 성공 처리
      if (response.data.code === 200) {
        setMessage("인증 코드가 이메일로 전송되었습니다.");
        alert("인증 코드가 이메일로 전송되었습니다.");
        setIsCodeSent(true);
      } else if (response.data.code === 2106) {
        // 존재하지 않는 이메일
        setMessage("가입된 이메일이 없습니다.");
      } else {
        // 기타 오류
        setMessage("이메일 인증 요청에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      setMessage("이메일 인증 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 비밀번호 변경 요청
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 최종 유효성 검사
    const { error } = passwordSchema.validate(
      { password: newPassword, confirmPassword: confirmPassword },
      { abortEarly: false },
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

    const response = await api.post("/v1/email/password/reset", {
      mail: email,
      code: authCode,
      password: newPassword,
      confirmPassword: confirmPassword,
    });
    try {
      if (response.data.code === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate(ROUTES.LOGIN); // 비밀번호 변경 후 로그인 페이지로 리디렉션
      } else {
        const errorCode = response.data.code;
        const errorMessage =
          FIND_PW_ERROR_MESSAGES[errorCode] ||
          "알 수 없는 오류가 발생했습니다.";
        alert(errorMessage);
        console.log(response.data);
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      setMessage("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVisible = (target) => {
    if (target === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (target === "confirmPassword") {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  return (
    <main className="find-pw-container">
      <Helmet>
        <title>{PAGE_TITLES.findPw}</title>
        <meta property="og:title" content={PAGE_TITLES.findPw} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.HELP.FIND_PW}`} />
        <meta name="twitter:title" content={PAGE_TITLES.findPw}></meta>
        <meta
          name="twitter:url"
          content={`${SITE_URL}${ROUTES.HELP.FIND_PW}`}
        ></meta>
      </Helmet>

      <section className="find-pw-left-side">
        <h2>비밀번호 찾기</h2>

        {!isCodeSent ? (
          <form onSubmit={handleSubmitEmail}>
            <div className="find-pw-input">
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
          <form onSubmit={handleChangePassword}>
            <div className="find-pw-input">
              <input
                type="text"
                placeholder="이메일로 받은 인증 코드를 입력하세요"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                required
              />
            </div>
            <div className="find-pw-input">
              <div className="find-pw-input-wrap">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={handleCheckPassword}
                  required
                />
                <div className="find-pw-right">
                  <button type="button" onClick={() => toggleVisible("password")}>
                    <img
                      src={isPasswordVisible ? imgPathEyeSlash : imgPathEye}
                      alt="비밀번호 보기"
                    />
                  </button>
                </div>
              </div>
              {errors.password && (
                <span className="find-pw-error">{errors.password}</span>
              )}
            </div>
            <div className="find-pw-input">
              <div className="find-pw-input-wrap">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={handleCheckPassword}
                  required
                />
                <div className="find-pw-right">
                  <button type="button" onClick={() => toggleVisible("confirmPassword")}>
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
                <span className="find-pw-error">{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" disabled={!active}>
              비밀번호 재설정
            </button>
          </form>
        )}

        {message && <div className="find-pw-message">{message}</div>}
      </section>
      <section className="find-pw-right-side">
        <Link to="/">
          <h1 className="find-pw-logo">
            <img src={imgPath} alt="컴히얼" />
          </h1>
        </Link>
        <div className="find-pw-description">
          <p>
            컴알못에게 가장 쉬운
            <br />
            PC추천 플랫폼
          </p>
        </div>
      </section>
    </main>
  );
};

export default FindPwPage;
