import "../styles/ProfileEdit.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";
import { useProfileMutation } from "../services/useInfoMutation";
import { User } from "../services/useUserInfo";

const ProfileEdit = () => {
  const imgPathProfile = "/images/default-profile.svg";
  const navigate = useNavigate();
  const { logout } = useAuth();

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
  });

  useEffect(() => {
    if (user?.data) {
      setFormData({
        nickname: user.data.nickname || "",
        email: user.data.email || "",
        profileImage: user.data.profileImage || null,
      });
      setOriginalEmail(user.data.email || "");
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
      if (preview.current) preview.current.src = imgSrc;
      setIsImgUploaded(true);
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    if (formData.nickname !== user.data.nickname) {
      form.append("nickname", formData.nickname);
    }
    if (formData.email !== user.data.email) {
      form.append("email", formData.email);
    }
    if (formData.profileImage !== user.data.profileImageUrl) {
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
      const response = await api.post("/v1/email/authcode", {
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
      const response = await api.post("/v1/email/verify", {
        mail: formData.email,
        verifyCode: verificationCode,
      });

      console.log("이메일 인증 성공:", response.data);
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
        <button className="profile-logout-btn">
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
                    src={imgPathProfile}
                    ref={preview}
                    alt="프로필 사진"
                    style={{
                      width: isImgUploaded ? "100%" : "4rem",
                      height: isImgUploaded ? "100%" : "4rem",
                      objectFit: isImgUploaded ? "cover" : "contain",
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
    </div>
  );
};

export default ProfileEdit;
