import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import api from "../hooks/useAxios";

const AdminPageGuard = () => {
  const { userInfo, isLoggedIn, isLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // 로딩 중이면 아무것도 하지 않음
    if (!isLoggedIn || userInfo?.user?.role !== "ADMIN") {
      alert("접근 권한이 없습니다.");
      navigate(ROUTES.HOME);
    } else {
      setUser(userInfo.user);
    }
    setChecking(false);
    return;
    // const checkRole = async () => {
    //   try {
    //     const response = await api.get("/v1/user/show");
    //     const userData = response.data;

    //     if (userData.role !== "ADMIN") {
    //       alert("접근 권한이 없습니다.");
    //       navigate(ROUTES.HOME);
    //     } else {
    //       setUser(userData);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     alert("로그인이 필요합니다.");
    //     navigate(ROUTES.LOGIN);
    //   } finally {
    //     setChecking(false);
    //   }
    // };

    // checkRole();
  }, [isLoading, isLoggedIn, userInfo, navigate]);

  if (isLoading || checking) return <div>권한 확인 중...</div>;
  if (!user) return null;

  return <Outlet />;
};

export default AdminPageGuard;
