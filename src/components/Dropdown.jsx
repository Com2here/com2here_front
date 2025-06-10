import "../styles/Dropdown.css";

import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DROPDOWN_MENU } from "../constants/menuItems";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";

const Dropdown = ({ showDropdown, setShowDropdown, navRef }) => {
  // 드롭다운 div 요소를 위한 ref
  const dropdownRef = useRef(null);

  const { logout } = useAuth();
  const navigate = useNavigate();
  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !navRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    // 클린업 함수
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [setShowDropdown, navRef]);

  // 드롭다운 열기/닫기
  const dropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  // 로그아웃
  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div onClick={dropdownHandler}>
        {showDropdown && (
          <ul className="dropdown-menu">
            {DROPDOWN_MENU.map((menu) =>
              menu.href ? (
                <Link key={menu.id} to={menu.href}>
                  <li>{menu.label}</li>
                </Link>
              ) : (
                <li key={menu.id} onClick={handleLogout}>
                  {menu.label}
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
