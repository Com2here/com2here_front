import "../styles/Navbar.css";

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import Dropdown from "./Dropdown";

const NavBar = () => {
  const imgPathLogo = "/images/logo.svg";
  const imgPathHeart = "/images/heart-angle.svg";
  const imgPathHistory = "/images/clock-square.svg";

  const navRef = useRef(null);

  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuth();
  const [view, setView] = useState(false);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to={"/"}>
          <img src={imgPathLogo} alt="컴히얼 로고" />
          <h1>컴히얼</h1>
        </Link>
      </div>
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
