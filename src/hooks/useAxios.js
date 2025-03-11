// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://58.238.182.100:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // 쿠키 기반 인증 시 필요
// });

// // 모든 요청에 JWT 토큰 자동 추가
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
