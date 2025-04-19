import { useState, useEffect } from "react";
import "../styles/ProfileEdit.css";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const imgPathProfile = "/images/profile.svg";
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
  });

  const [originalEmail, setOriginalEmail] = useState(""); // 기존 이메일 저장
  const [isEditable, setIsEditable] = useState(false); // 편집 가능 여부

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedEmail = localStorage.getItem("email");

    const nickname = storedNickname || userInfo?.nickname || "";
    const email = storedEmail || userInfo?.email || "";

    setFormData({ nickname, email });
    setOriginalEmail(email);
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("nickname", formData.nickname);
        localStorage.setItem("email", formData.email);

        setIsEditable(false);

        if (formData.email !== originalEmail) {
          alert("프로필이 성공적으로 수정되었습니다! 이메일로 전송된 인증 code를 입력해주세요.");
          setIsModalOpen(true);
          handleEmailVerification(); // 인증 코드 자동 발송
        } else {
          alert("프로필이 성공적으로 수정되었습니다.");
        }

        setOriginalEmail(formData.email);
      } else {
        alert("프로필 수정 실패: " + result.message);
        console.error("오류 응답:", result);
      }
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/email/authcode", {
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
      const response = await axios.post("http://localhost:3000/api/v1/email/verify", {
        mail: formData.email,
        verifyCode: verificationCode,
      });

      console.log("이메일 인증 성공:", response.data);
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
      setIsModalOpen(false);
      navigate("/account");
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      alert("이메일 인증 실패");
    }
  };

  const toggleEdit = () => {
    setIsEditable(true);
  };

  return (
    <div className="profile-edit">
      <h1>프로필 편집</h1>
      <div className="profile-edit-form">
        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <div className="profile-edit-contents">
            <div className="profile-edit-img">
              <div className="profile-edit-upload">
                <img src={imgPathProfile} alt="프로필 사진" />
              </div>
              <p>프로필 사진 변경</p>
            </div>

            <div className="profile-edit-info">
              <div className="register-input-wrap input-username">
                <input
                  name="nickname"
                  placeholder="이름"
                  type="text"
                  value={formData.nickname}
                  onChange={handleChange}
                  readOnly={!isEditable}
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
                  readOnly={!isEditable}
                  required
                />
              </div>
            </div>
          </div>

          <div className="profile-edit-toggle-btn">
            {isEditable && <button type="submit">프로필 업데이트</button>}
          </div>
        </form>

        {!isEditable && (
          <div className="profile-edit-toggle-btn">
            <button type="button" onClick={toggleEdit}>
              프로필 수정
            </button>
          </div>
        )}

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
  );
};

export default ProfileEdit;
