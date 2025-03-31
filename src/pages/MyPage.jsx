import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="MyPage">
      <div class="profile-card">
        {/* <img class="profile-img" src="profile.jpg" alt="Profile Image"> */}
        <h2 class="user-name">홍길동</h2>
        <p class="user-email">honggildong@example.com</p>
        <button class="edit-button" onclick="editProfile()">
          프로필 수정
        </button>
      </div>

      <div class="user-details">
        <h3>사용자 정보</h3>
        <div class="details-item">
          <label>이름</label>
          <span>홍길동</span>
        </div>
        <div class="details-item">
          <label>이메일</label>
          <span>honggildong@example.com</span>
        </div>
        <div class="details-item">
          <label>가입일</label>
          <span>2023년 1월 15일</span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
