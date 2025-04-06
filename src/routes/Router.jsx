import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MyChatbot from "../components/MyChatbot";

import HomePage from "../pages/HomePage";
import SupportPage from "../pages/SupportPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyPage from "../pages/MyPage";
import MylistPage from "../pages/MylistPage";
import AccountPage from "../pages/AccountPage";
import AccountDeletePage from "../pages/AccountDeletePage";
import EstimatePage from "../pages/EstimatePage";
import PcComparisonPage from "../pages/PcComparisonPage";
import FindPwPage from "../pages/FindPwPage";
import OAuthCallback from "../oauth/OAuthCallback.jsx";
import ScrollToTop from "../utils/scrollToTop.js";
import PasswordChangePage from "../pages/PasswordChangePage.jsx";

export const Router = () => {
  return (
    <BrowserRouter>
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
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/account/delete" element={<AccountDeletePage />}></Route>
          <Route path="/account/password" element={<PasswordChangePage />}></Route>
          <Route path="/estimate" element={<EstimatePage />}></Route>
          <Route path="/pc-comparison" element={<PcComparisonPage />}></Route>
          <Route path="/help/findPw" element={<FindPwPage />}></Route>

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
    </BrowserRouter>
  );
};
