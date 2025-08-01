import { Route, Routes } from "react-router-dom";

import AdminPageGuard from "../components/AdminPageGuard.jsx";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginCallbackPage from "../components/LoginCallbackPage.jsx";
import { ROUTES } from "../constants/routes";
import OAuthCallback from "../oauth/OAuthCallback.jsx";
import AccountPage from "../pages/AccountPage";
import AdminProductPage from "../pages/AdminProductPage";
import AdminSoftwarePage from "../pages/AdminSoftwarePage";
import AdminUserPage from "../pages/AdminUserPage";
import ErrorPage from "../pages/ErrorPage.jsx";
import EstimatePage from "../pages/EstimatePage";
import FindPwPage from "../pages/FindPwPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MylistPage from "../pages/MylistPage";
import MyPage from "../pages/MyPage";
import RegisterPage from "../pages/RegisterPage";
import SupportPage from "../pages/SupportPage";
import TermsPage from "../pages/TermsPage.jsx";
import ScrollToTop from "../utils/scrollToTop.js";
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

export const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <div className="main-content">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route element={<PublicRoute />}>
            {/* 비로그인 유저만 접근 가능한 페이지 */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            {/* 로그인 유저만 접근 가능한 페이지 */}
            <Route path={ROUTES.MYPAGE} element={<MyPage />} />
            <Route path={ROUTES.MYLIST} element={<MylistPage />}></Route>
            <Route path="/account/*" element={<AccountPage />}></Route>
          </Route>
          <Route path={ROUTES.ESTIMATE} element={<EstimatePage />}></Route>
          <Route path={ROUTES.HELP.FIND_PW} element={<FindPwPage />}></Route>
          <Route path={ROUTES.SUPPORT} element={<SupportPage />} />
          <Route path={ROUTES.TERMS} element={<TermsPage />} />
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

          <Route path="/admin" element={<AdminPageGuard />}>
            <Route path="software" element={<AdminSoftwarePage />} />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="users" element={<AdminUserPage />} />
            <Route index element={<AdminSoftwarePage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer></Footer>
    </>
  );
};
