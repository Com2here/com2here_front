import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";

const OAuthCallback = ({ provider }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");

      if (!code) {
        console.error("Authorization code not found");
        return;
      }

      try {
        // 서버에 인증 코드로 액세스 토큰 요청
        const response = await api.post(`/v1/oauth/${provider}`, {
          code,
        });

        if (response.data.data.accessToken) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("username", response.data.data.username);
          navigate("/");
        } else {
          console.error(`${provider} 로그인 실패:`, response.data);
        }
      } catch (error) {
        console.error(`${provider} 로그인 처리 중 오류:`, error);
      }
    };

    handleOAuthLogin();
  }, []);
};

export default OAuthCallback;
