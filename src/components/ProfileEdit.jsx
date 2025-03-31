import { useState } from "react";
import "./ProfileEdit.css";
import { useAuth } from "../contexts/AuthContext";

const ProfileEdit = () => {
  const imgPathProfile = "/images/profile.svg ";

  const { userInfo } = useAuth();

  // 폼 제출 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("프로필이 수정되었습니다!");
    // 서버 데이터 전송
    console.log(user);
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
                  name="username"
                  placeholder="이름"
                  type="text"
                  //   value={userInfo.user.username}
                  //   onChange={handleChange}
                  required
                />
                {/* {errors.username && (
                  <span className="register-error-message">
                    {errors.username}
                  </span>
                )} */}
              </div>
              <div className="register-input-wrap input-id">
                <input
                  name="email"
                  placeholder="이메일"
                  type="email"
                  //   value={formData.email}
                  //   onChange={handleChange}
                  required
                />
                {/* {errors.email && (
                  <span className="register-error-message">{errors.email}</span>
                )} */}
              </div>
            </div>
          </div>
          <div className="profile-edit-btn-wrapper">
            <button>프로필 업데이트</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
