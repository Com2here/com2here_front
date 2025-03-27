// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";

// // Redux Slice와 상태 관리
// const userSlice = {
//   name: "user",
//   initialState: {
//     userInfo: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setUserInfo: (state, action) => {
//       state.userInfo = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// };

// // 카카오 로그인 처리 async thunk
// const KakaoLogin = async (code, dispatch) => {
//   try {
//     dispatch(userSlice.reducers.setLoading(true));

//     const response = await fetch(
//       `http://localhost:3000/api/v1/user/login/kakao?code=${code}`
//     );
//     const data = await response.json();

//     if (data.access_token) {
//       localStorage.setItem("token", data.access_token); // access_token 저장
//       dispatch(userSlice.reducers.setUserInfo(data)); // 사용자 정보 저장
//     } else {
//       dispatch(userSlice.reducers.setError("로그인 실패"));
//     }
//   } catch (error) {
//     dispatch(
//       userSlice.reducers.setError("로그인 처리 중 오류가 발생했습니다.")
//     );
//   } finally {
//     dispatch(userSlice.reducers.setLoading(false));
//   }
// };

// // Redux 스토어 설정
// const store = configureStore({
//   reducer: {
//     user: (state = userSlice.initialState, action) => {
//       switch (action.type) {
//         case "setUserInfo":
//           return { ...state, userInfo: action.payload };
//         case "setLoading":
//           return { ...state, loading: action.payload };
//         case "setError":
//           return { ...state, error: action.payload };
//         default:
//           return state;
//       }
//     },
//   },
// });

// // SocialRedirectHandler 컴포넌트
// const SocialRedirectHandler = () => {
//   const dispatch = useDispatch();
//   let code = new URL(window.location.href).searchParams.get("code");

//   useEffect(() => {
//     if (code) {
//       KakaoLogin(code, dispatch); // 카카오 로그인 처리
//     }
//   }, [code, dispatch]);

//   return <div>로그인 처리 중...</div>;
// };

// export default SocialRedirectHandler;
