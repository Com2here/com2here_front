import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
