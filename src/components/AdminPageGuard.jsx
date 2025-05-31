import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../hooks/useAxios";
import AdminPage from "../pages/AdminPage.jsx";

const AdminPageGuard = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await api.get("/v1/user/show");
        const userData = res.data.data;

        if (userData.role !== "ADMIN") {
          alert("접근 권한이 없습니다.");
          navigate("/");
        } else {
          setUser(userData);
        }
      } catch (err) {
        console.error(err);
        alert("로그인이 필요합니다.");
        navigate("/login");
      } finally {
        setChecking(false);
      }
    };

    checkRole();
  }, []);

  if (checking) return <div>권한 확인 중...</div>;
  if (!user) return null;

  return <AdminPage />;
};

export default AdminPageGuard;
