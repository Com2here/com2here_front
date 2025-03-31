import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Dropdown from "./Dropdown";
import "./Navbar.css";

const NavBar = () => {
  const imgPathLogo = "/images/logo.svg";
  const imgPathHeart = "/images/heart.svg";
  const imgPathLogout = "/images/logout.svg";

  const navRef = useRef(null);

  const navigate = useNavigate();
  const { isLoggedIn, userInfo, logout } = useAuth();
  const [view, setView] = useState(false);

  // 로그아웃
  const handleLogout = async () => {
    await logout();
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
            <Link className="nav-logout" onClick={handleLogout}>
              <img src={imgPathLogout} alt="로그아웃" />
            </Link>
            <Link className="navbar-mylist" to={"/mylist"}>
              <img src={imgPathHeart} alt="찜한 견적" />
            </Link>
            <div
              className="nav-profile"
              ref={navRef}
              onClick={() => setView(!view)}
            >
              {userInfo.user.username}
            </div>
            {view && (
              <Dropdown
                showDropdown={view}
                setShowDropdown={setView}
                navRef={navRef}
              />
            )}
          </>
        ) : (
          <>
            <Link className="navbarLogin" to={"/login"}>
              로그인
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
