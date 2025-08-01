import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { OAUTH_CALLBACK_ERROR_MESSAGES } from "../constants/errors";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";

const OAuthCallback = ({ provider }) => {
  const navigate = useNavigate();
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

        if (response.code === 200) {
          if (response.data.accessToken) {
            login({
              token: {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              },
              user: {
                email: response.data.email,
                nickname: response.data.nickname,
              },
            });
            navigate(ROUTES.HOME);
          } else {
            console.error(`${provider} 로그인 실패:`, response);
          }
        } else if (response.code in OAUTH_CALLBACK_ERROR_MESSAGES) {
          alert(OAUTH_CALLBACK_ERROR_MESSAGES[response.code]);
        }
      } catch (error) {
        console.error(`${provider} 로그인 처리 중 오류:`, error);
      }
    };

    handleOAuthLogin();
  }, []);
};

export default OAuthCallback;
