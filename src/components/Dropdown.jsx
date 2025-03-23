import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

const Dropdown = ({ showDropdown, setShowDropdown, navRef }) => {
  // 드롭다운 div 요소를 위한 ref
  const dropdownRef = useRef(null);

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

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div onClick={dropdownHandler}>
        {showDropdown && (
          <ul className="dropdown-menu">
            <Link to={"/mypage"}>
              <li>내 컴퓨터</li>
            </Link>
            <Link to={"/support"}>
              <li>문의하기</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
