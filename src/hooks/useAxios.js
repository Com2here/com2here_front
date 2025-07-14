import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
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

// 요청 전 처리
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
      // 액세스 토큰 추가
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["Refresh"] = refreshToken;
    }

    if (config.url === "/v1/user/update") {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    // 에러 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 응답 성공 시 처리
    return response.data;
  },

  async (error) => {
    console.log(error);
    const errorStatus = error.response.status;
    const originalRequest = error.config;

    // 토큰 만료 시 토큰 갱신
    if (errorStatus === 401) {
      try {
        const { newAccessToken, newRefreshToken } = error.response.data;
        if (newAccessToken && newRefreshToken) {
          // 새로운 토큰 저장
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          // 반려된 api 재요청
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Refresh"] = newRefreshToken;

          return await api(originalRequest);
        }
      } catch (refreshTokenError) {
        alert("토큰 갱신 중 오류가 발생했습니다. 다시 로그인해주세요.");
        const { logout } = useAuth();
        window.location.href = ROUTES.LOGIN;

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
