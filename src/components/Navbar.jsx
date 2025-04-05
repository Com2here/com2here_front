import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dropdown from "./Dropdown";
import "./Navbar.css";

const NavBar = () => {
  const imgPathLogo = "/images/logo.svg";
  const imgPathHeart = "/images/heart.svg";
  const imgPathHistory = "/images/history.png";

  const navRef = useRef(null);

  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuth();
  const [view, setView] = useState(false);

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
            <div className="nav-recent">
              <img src={imgPathHistory} alt="최근 본 견적" />
            </div>
            <Link className="navbar-mylist" to={"/mylist"}>
              <img src={imgPathHeart} alt="찜한 견적" />
            </Link>
            <div
              className="nav-profile"
              ref={navRef}
              onClick={() => setView(!view)}
            >
              {userInfo.user.nickname}
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
