import { Link } from "react-router-dom";
import React from "react";
import "./NavBar.css";

const NavBar = () => {
  const imgPath = "/images/logo.svg";

  return (
    <div className="navbar">
      <h1>
        <Link to={"/"}>
          <img src={imgPath} alt="컴히얼" />
        </Link>
      </h1>
      <div className="nav-links">
        <Link className="navbarLogin" to={"/login"}>
          로그인
        </Link>
        <Link className="navbarSupport" to={"/support"}>
          문의하기
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
