import "../styles/ProfileEdit.css";

import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";
import { useProfileMutation } from "../services/useInfoMutation";
import { User } from "../services/useUserInfo";

const imgPathEye = "/images/eye.svg";
const imgPathEyeSlash = "/images/eye-slash.svg";

const ProfileEdit = () => {
  const imgPathProfile = "/images/default-profile.svg";
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [imgPreviewUrl, setImgPreviewUrl] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const { data: user, isLoading, error } = User();
  const { mutate: updateProfile } = useProfileMutation();

  const preview = useRef(null);

  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalEmail, setOriginalEmail] = useState(""); // 기존 이메일 저장
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    profileImage: null,
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
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

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || "",
        email: user.email || "",
        profileImage: null, // 초기엔 업로드된 파일 없음
        password: "",
        confirmPassword: "",
      });
      setImgUrl(
        user.profileImageUrl
          ? `http://localhost:3000${user.profileImageUrl}`
          : imgPathProfile,
      );
      setOriginalEmail(user.email || "");
    }
  }, [user]);

  // 프로필 조회 오류 처리 및 로그인 화면 리디렉션
  useEffect(() => {
    if (error) {
      if (error.message === "Relogin required") {
        logout();
        navigate(ROUTES.LOGIN);
      }
    }
  }, [error]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgSrc = URL.createObjectURL(file);
      setImgUrl(imgSrc);
      setIsImgUploaded(true);
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // 비밀번호 관련 필드만 검사
      const validation = schema.validate(
        {
          password: updated.password,
          confirmPassword: updated.confirmPassword,
        },
        { abortEarly: false },
      );
      if (validation.error) {
        const errorMessages = {};
        validation.error.details.forEach((detail) => {
          errorMessages[detail.path[0]] = detail.message;
        });
        setErrors(errorMessages);
      } else {
        setErrors({});
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    console.log("profileImage is File?", formData.profileImage instanceof File);
    console.log("profileImage:", formData.profileImage);

    if (formData.nickname !== user.nickname) {
      form.append("nickname", formData.nickname);
    }
    if (formData.email !== user.email) {
      form.append("email", formData.email);
    }
    if (formData.profileImage instanceof File) {
      form.append("profileImage", formData.profileImage);
    }

    for (let pair of form.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    try {
      await updateProfile(form);

      if (form.has("email")) {
        alert(
          "프로필이 성공적으로 수정되었습니다! 이메일로 전송된 인증 code를 입력해주세요.",
        );
        setIsModalOpen(true);
        handleEmailVerification(); // 인증 코드 자동 발송
      }

      setOriginalEmail(formData.email);
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleEmailVerification = async () => {
    try {
      const response = await api.post("/v1/email/code", {
        mail: formData.email,
      });

      console.log("이메일 인증 코드 전송 성공:", response);
      alert("이메일로 인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error("이메일 인증 코드 전송 실패:", error);
      alert("이메일 인증 코드 전송 실패");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await api.post("/v1/email/code/verify", {
        mail: formData.email,
        verifyCode: verificationCode,
      });

      console.log("이메일 인증 성공:", response);
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
      setIsModalOpen(false);
      navigate(ROUTES.ACCOUNT);
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      alert("이메일 인증 실패");
    }
  };

  return (
    <div className="profile-edit">
      <div className="profile-header">
        <h2>내 프로필</h2>
        <button className="profile-logout-btn" onClick={logout}>
          <span className="text top">로그아웃</span>
          <span className="text bottom">로그아웃</span>
        </button>
      </div>
      <div className="profile-edit-wrapper">
        <h3>프로필 편집</h3>
        <div>
          <form className="profile-edit-form" onSubmit={handleSubmit}>
            <div className="profile-edit-contents">
              <div className="profile-edit-img">
                <div className="profile-edit-upload">
                  <img
                    src={imgUrl || imgPathProfile}
                    alt="프로필 이미지"
                    style={{
                      width: "6rem",
                      height: "6rem",
                      objectFit: "cover",
                      // borderRadius: "50%",
                    }}
                  />
                </div>
                <label htmlFor="profileImg" className="profile-img-label">
                  프로필 이미지 업로드
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  onChange={handleFileChange}
                  className="profile-img-input"
                />
              </div>

              <div className="profile-edit-info">
                <div className="register-input-wrap input-username">
                  <input
                    name="nickname"
                    placeholder="이름"
                    type="text"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                  />
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
                </div>

                {/* 비밀번호 입력 */}
                <div className="register-input-wrap input-password">
                  <div>
                    <input
                      name="password"
                      placeholder="비밀번호"
                      type={isPasswordVisible ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <div className="register-pw-right">
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible((v) => !v)}
                      >
                        <img
                          src={isPasswordVisible ? imgPathEyeSlash : imgPathEye}
                          alt="비밀번호 보기"
                        />
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <span className="register-error-message">
                      {errors.password}
                    </span>
                  )}
                </div>
                {/* 비밀번호 확인 입력 */}
                <div className="register-input-wrap input-password">
                  <div>
                    <input
                      name="confirmPassword"
                      placeholder="비밀번호 확인"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <div className="register-pw-right">
                      <button
                        type="button"
                        onClick={() => setIsConfirmPasswordVisible((v) => !v)}
                      >
                        <img
                          src={
                            isConfirmPasswordVisible
                              ? imgPathEyeSlash
                              : imgPathEye
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
            </div>

            <div className="profile-edit-btn">
              <button type="submit">프로필 업데이트</button>
            </div>
          </form>
          {/* 인증 모달 */}
          {isModalOpen && (
            <div className="email-verification-modal">
              <h3>인증 코드 확인</h3>
              <input
                type="text"
                placeholder="인증 코드 입력"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button onClick={handleVerifyCode}>인증 확인</button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-delete-btn-row">
        <button
          className="profile-delete-btn"
          type="button"
          onClick={() => navigate("/account/delete")}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
