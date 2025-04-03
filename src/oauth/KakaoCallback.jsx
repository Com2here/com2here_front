import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");

      if (!code) {
        console.error("Authorization code not found");
        return;
      }

      try {
        // 서버에 인증 코드로 액세스 토큰 요청
        const response = await axios.post(
          "http://localhost:3000/api/v1/oauth/kakao",
          { code },
        );
        if (response.data.data.accessToken) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("username", response.data.data.username);
          navigate("/");
        } else {
          console.error("카카오 로그인 실패:", response.data);
        }
      } catch (error) {
        console.error("카카오 로그인 처리 중 오류:", error);
      }
    };

    handleKakaoLogin();
  }, []);
};

export default KakaoCallback;
