import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPage from "./pages/MyPage";
import MylistPage from "./pages/MylistPage";
import AccountPage from "./pages/AccountPage";
import EstimatePage from "./pages/EstimatePage";
import PcComparisonPage from "./pages/PcComparisonPage";
import FindPwPage from "./pages/FindPwPage";

import KakaoCallback from "./oauth/KakaoCallback.jsx";
import NaverCallback from "./oauth/NaverCallback.jsx";
import GoogleCallback from "./oauth/GoogleCallback.jsx";
// import FindPasswordPage from "./pages/FindPasswordPage";
// import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mylist" element={<MylistPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/estimate" element={<EstimatePage />}></Route>
            <Route path="/pc-comparison" element={<PcComparisonPage />}></Route>
            <Route path="/help/findPw" element={<FindPwPage />}></Route>

            <Route path="/callback/kakao" element={<KakaoCallback />} />
            <Route path="/callback/naver" element={<NaverCallback />} />
            <Route path="/callback/google" element={<GoogleCallback />} />
            {/* <Route path="/find-password" element={<FindPasswordPage />} /> */}
            {/* <Route path="/reset-password" element={<ResetPassword />}></Route> */}
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
