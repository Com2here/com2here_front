import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/token";

/**
 * Axios 기반의 API 클라이언트 설정 파일입니다.
 * 공통 헤더, 인터셉터 등을 설정하며,
 * accessToken/refreshToken 자동 처리 및 401 오류 시 재발급 로직을 포함합니다.
 */

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 기반 인증 시 필요
});

// 모든 요청에 JWT 토큰 자동 추가
api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    config.headers["Refresh"] = refreshToken;
  }

  if (config.url === "/v1/user/update") {
    delete config.headers["Content-Type"];
  }

  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    // 토큰 만료 시 토큰 갱신
    if (error.response?.data?.code === "401") {
      try {
        const { accessToken, refreshToken } = error.response.data;
        if (accessToken && refreshToken) {
          // 새로운 토큰 저장
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          // 반려된 api 재요청
          const originalRequest = error.config;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          originalRequest.headers["Refresh"] = refreshToken;

          return api(originalRequest);
        }
      } catch (refreshTokenError) {
        const { logout } = useAuth();

        // 어떤 에러라도 로그아웃 처리
        console.error(
          "로그아웃 처리. 토큰 갱신 중 오류 발생:",
          refreshTokenError,
        );
        await logout();
      }
    }
    return Promise.reject(error);
  },
);

export default api;
