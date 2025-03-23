import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import "./SideBar.css";

const SideBar = () => {
  const imgPath = "/images/mypage-nav.svg";

  const locationNow = useLocation();

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {locationNow.pathname === "/mypage" && (
          <Link to="/mypage">
            <p className="sidebar-nav-title">나의 컴퓨터</p>
          </Link>
        )}
        {locationNow.pathname === "/account" && (
          <Link to="/account">
            <p className="sidebar-nav-title">계정 설정</p>
          </Link>
        )}

        <ul>
          <img src={imgPath} className="sidebar-nav-img" />
          {locationNow.pathname === "/mypage" && (
            <>
              <Link to={"/mylist"}>
                <li>관심목록</li>
              </Link>
              <li>
                활동내역
                <ul>
                  내가 쓴 글<br />
                  내가 쓴 댓글
                </ul>
              </li>
            </>
          )}
          {locationNow.pathname === "/account" && (
            <>
              <Link to={"/account"}>
                <li>프로필 편집</li>
              </Link>
              <li>
                비밀번호 변경
              </li>
              <li>
                계정 삭제
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
