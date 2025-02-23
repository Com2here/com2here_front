import { Link } from "react-router-dom";
import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>Com here!!!!!!</h1>
      <div className="nav-links">
        <Link className="navbarMenu" to={"/"}>
          홈
        </Link>
        <Link className="navbarMenu" to={"/login"}>
          로그인
        </Link>
        <Link className="navbarMenu" to={"/support"}>
          문의하기
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
