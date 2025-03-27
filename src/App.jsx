import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPage from "./pages/MyPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import { AuthProvider } from "./contexts/AuthContext";
import KakaoCallback from "./components/KakaoCallback";

function App() {
  return (
    <AuthProvider>
      <Header></Header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/callback/kakao" element={<KakaoCallback />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
