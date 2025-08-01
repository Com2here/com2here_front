import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";

const LoginCallbackPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const provider = query.get("state");

    if (!code || !provider) {
      alert("잘못된 접근입니다.");
      navigate(ROUTES.HOME);
      return;
    }

    (async () => {
      try {
        const userInfoRes = await api.post(`/v1/oauth/${provider}`, { code });
        const userInfo = userInfoRes.data;

        const saveRes = await api.post("/v1/oauth/social-login", {
          email: userInfo.email,
          nickname: userInfo.nickname,
          profileImageUrl: userInfo.profileImageUrl,
          provider,
          oauthId: userInfo.oauthId,
        });

        if (saveRes.code === 1000 || saveRes.code === 200) {
          const tokenInfo = saveRes.data;

          login({
            token: {
              accessToken: tokenInfo.accessToken,
              refreshToken: tokenInfo.refreshToken,
            },
            user: {
              nickname: tokenInfo.nickname,
              email: tokenInfo.email,
              role: tokenInfo.role,
            },
          });
          navigate(ROUTES.HOME);
        } else {
          alert("소셜 로그인 실패: " + saveRes.message);
          navigate(ROUTES.LOGIN);
        }
      } catch (err) {
        console.error("OAuth 처리 중 오류:", err);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate(ROUTES.LOGIN);
      }
    })();
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default LoginCallbackPage;
