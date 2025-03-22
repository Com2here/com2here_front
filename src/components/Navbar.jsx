import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const imgPathLogo = "/images/logo.svg";
  const imgPathHeart = "/images/heart.svg";

  const navigate = useNavigate();
  const { isLoggedIn, userInfo, logout } = useAuth();

  // 로그아웃
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h1>
        <Link to={"/"}>
          <img src={imgPathLogo} alt="컴히얼" />
        </Link>
      </h1>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link className="navbarLogout" to={"/"} onClick={handleLogout}>
              로그아웃
            </Link>
            <Link className="navbar-mylist" to={"/mylist"}>
              <img src={imgPathHeart} alt="찜한 견적" />
            </Link>
            <Link className="navbar-mycomputer">{userInfo.user.username}</Link>
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
