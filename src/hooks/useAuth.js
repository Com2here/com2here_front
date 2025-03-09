import { useState } from "react";
import api from "./useAxios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/login", { username, password });
      localStorage.setItem("token", response.data.token); // JWT 저장
      return response.data;
    } catch (err) {
      setError(err.response?.data || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useAuth;
