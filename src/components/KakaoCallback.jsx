import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");

      if (!code) {
        console.error("Authorization code not found");
        return;
      }

      try {
        console.log("요청 1");
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");
        console.log(code);

        if (!code) {
          console.error("Authorization code not found");
          return;
        }

        // 서버에 인증 코드로 액세스 토큰 요청
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/callback/kakao", // 서버의 액세스 토큰 요청 API
          { code } // 인증 코드 서버에 전달
        );
        console.log("요청 2");
        console.log("응답 데이터:", response.data);

        if (response.data.access_token) {
          localStorage.setItem("token", response.data.access_token); // ✅ token 저장
          navigate("/"); // 로그인 후 홈으로 이동
        } else {
          console.error("카카오 로그인 실패:", response.data);
        }
      } catch (error) {
        console.error("카카오 로그인 처리 중 오류:", error);
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
