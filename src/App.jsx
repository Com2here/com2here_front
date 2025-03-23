import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPage from "./pages/MyPage";
import MylistPage from "./pages/MylistPage";
import AccountPage from "./pages/AccountPage";

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
        <Route path="/mylist" element={<MylistPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
