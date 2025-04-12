import { useState, useEffect } from "react";
import "./ProfileEdit.css";
import { useAuth } from "../contexts/AuthContext";

const ProfileEdit = () => {
  const imgPathProfile = "/images/profile.svg";
  const { userInfo } = useAuth();

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
  });

  const [isEditable, setIsEditable] = useState(false); // 편집 가능 여부

  // 로컬스토리지나 userInfo에서 초기 데이터 불러오기
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedEmail = localStorage.getItem("email");

    setFormData({
      nickname: storedNickname || userInfo?.nickname || "",
      email: storedEmail || userInfo?.email || "",
    });
  }, [userInfo]);

  // input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 프로필 업데이트 핸들러
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
        alert("프로필이 성공적으로 수정되었습니다!");
        console.log("서버 응답:", result);

        // 수정된 데이터 localStorage에 저장
        localStorage.setItem("nickname", formData.nickname);
        localStorage.setItem("email", formData.email);

        // 다시 읽기 전용으로 전환
        setIsEditable(false);
      } else {
        alert("프로필 수정 실패: " + result.message);
        console.error("오류 응답:", result);
      }
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  // 편집 모드 전환
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

              {/*<div className="email-verified-status">*/}
              {/*  <p>*/}
              {/*    이메일 인증 상태:{" "}*/}
              {/*    <strong style={{ color: userInfo?.verified ? "green" : "red" }}>*/}
              {/*      {userInfo?.verified ? "인증됨" : "미인증"}*/}
              {/*    </strong>*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
          </div>

          <div className="profile-edit-toggle-btn">
            {isEditable && <button type="submit">프로필 업데이트</button>}
          </div>
        </form>
        {!isEditable ? (
          <div className="profile-edit-toggle-btn">
            <button type="button" onClick={toggleEdit}>
              프로필 수정
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileEdit;
