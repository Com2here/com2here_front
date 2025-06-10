import "../styles/Sidebar.css";

import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { ACCOUNT_MENU } from "../constants/menuItems";
import { ROUTES } from "../constants/routes";

const SideBar = () => {
  const imgPath = "/images/mypage-nav.svg";

  const locationNow = useLocation();
  const isAccountPage = locationNow.pathname.startsWith("/account");

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {locationNow.pathname === ROUTES.MYPAGE && (
          <Link to={ROUTES.MYPAGE}>
            <p className="sidebar-nav-title">나의 컴퓨터</p>
          </Link>
        )}
        {isAccountPage && (
          <Link to={ROUTES.ACCOUNT.PROFILE}>
            <p className="sidebar-nav-title">계정 설정</p>
          </Link>
        )}

        <div>
          <img src={imgPath} className="sidebar-nav-img" />
          <ul className="sidebar-menu-list">
            {locationNow.pathname === ROUTES.MYPAGE && (
              <>
                <Link to={ROUTES.MYLIST}>
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
            {isAccountPage && (
              <>
                {ACCOUNT_MENU.map((menu) => (
                  <li key={menu.id}>
                    <NavLink to={menu.href}>{menu.label}</NavLink>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
