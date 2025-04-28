import React from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import MyChatbot from "../components/MyChatbot";
import OAuthCallback from "../oauth/OAuthCallback.jsx";
import AccountDeletePage from "../pages/AccountDeletePage";
import AccountPage from "../pages/AccountPage";
import EstimatePage from "../pages/EstimatePage";
import FindPwPage from "../pages/FindPwPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MylistPage from "../pages/MylistPage";
import MyPage from "../pages/MyPage";
import PasswordChangePage from "../pages/PasswordChangePage.jsx";
import PcComparisonPage from "../pages/PcComparisonPage";
import RegisterPage from "../pages/RegisterPage";
import SupportPage from "../pages/SupportPage";
import ScrollToTop from "../utils/scrollToTop.js";

export const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mylist" element={<MylistPage />}></Route>
          <Route path="/account/profile" element={<AccountPage />}></Route>
          <Route path="/account/delete" element={<AccountDeletePage />}></Route>
          <Route
            path="/account/changePw"
            element={<PasswordChangePage />}
          ></Route>
          <Route path="/estimate" element={<EstimatePage />}></Route>
          <Route path="/pc-comparison" element={<PcComparisonPage />}></Route>
          <Route path="/help/findPw" element={<FindPwPage />}></Route>
          <Route path="/login/callback" element={<LoginCallbackPage />} />

          <Route
            path="/callback/kakao"
            element={<OAuthCallback provider="kakao" />}
          />
          <Route
            path="/callback/naver"
            element={<OAuthCallback provider="naver" />}
          />
          <Route
            path="/callback/google"
            element={<OAuthCallback provider="google" />}
          />
        </Routes>
        <MyChatbot />
      </div>
      <Footer></Footer>
    </>
  );
};
