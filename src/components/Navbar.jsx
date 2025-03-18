import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const imgPath = "/images/logo.svg";
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h1>
        <Link to={"/"}>
          <img src={imgPath} alt="컴히얼" />
        </Link>
      </h1>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link className="navbarLogout" to={"/"} onClick={handleLogout}>
              로그아웃
            </Link>
            <Link className="navbarMypage" to={"/mypage"}>
              프로필
            </Link>
          </>
        ) : (
          <>
            <Link className="navbarLogin" to={"/login"}>
              로그인
            </Link>
            <Link className="navbarSupport" to={"/support"}>
              문의하기
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
