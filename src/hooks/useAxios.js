import axios from "axios";

import { ROUTES } from "../constants/routes";
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
    if (
      errorStatus === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/v1/token/rotate")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
          throw new Error("리프레시 토큰이 없습니다.");
        }

        // 토큰 갱신 요청
        const response = await api.get(
          "/v1/token/rotate",
          {},
          {
            headers: {
              // Refresh: refreshToken,
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        if (newAccessToken && newRefreshToken) {
          // 새로운 토큰 저장
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          // 원래 요청의 헤더 업데이트
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Refresh"] = newRefreshToken;

          // 원래 요청 재시도
          return await api(originalRequest);
        }
      } catch (refreshTokenError) {
        alert("토큰 갱신 중 오류가 발생했습니다. 다시 로그인해주세요.");
        console.error("토큰 갱신 실패:", refreshTokenError);

        // 로컬 스토리지의 토큰 제거
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // 로그인 페이지로 리다이렉트
        window.location.href = ROUTES.LOGIN;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
