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
import FindPasswordPage from "./pages/FindPasswordPage";
import KakaoCallback from "./components/KakaoCallback";
import NaverCallback from "./components/NaverCallback.jsx";
import GoogleCallback from "./components/GoogleCallback.jsx";
import MylistPage from "./pages/MylistPage";
import AccountPage from "./pages/AccountPage";
import EstimatePage from "./pages/EstimatePage";
import ResetPassword from "./components/ResetPassword";
import PcComparisonPage from "./pages/PcComparisonPage";

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
            <Route path="/find-password" element={<FindPasswordPage />} />
            <Route path="/callback/kakao" element={<KakaoCallback />} />
            <Route path="/callback/naver" element={<NaverCallback />} />
            <Route path="/callback/google" element={<GoogleCallback />} />
            <Route path="/mylist" element={<MylistPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/estimate" element={<EstimatePage />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/pc-comparison" element={<PcComparisonPage />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
