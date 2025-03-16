import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import "./SideBar.css";

const SideBar = () => {
  const imgPath = "/images/mypage-nav.svg";

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/mypage">
          <p className="sidebar-nav-title">나의 컴퓨터</p>
        </Link>
        <ul>
          <img src={imgPath} className="sidebar-nav-img" />
          <li>
            회원정보
            <ul>회원정보 수정</ul>
          </li>
          <li>관심목록</li>
          <li>
            활동내역
            <ul>
              내가 쓴 글<br />
              내가 쓴 댓글
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
