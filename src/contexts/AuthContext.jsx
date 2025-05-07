import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/token";

const AuthContext = createContext({
  isLoggedIn: !!getAccessToken(),
  userInfo: {
    token: {
      accessToken: getAccessToken(),
      refreshToken: getRefreshToken(),
    },
    user: {
      nickname: localStorage.getItem("nickname"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
    },
  },
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());
    setUserInfo({
      token: {
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken(),
      },
      user: {
        nickname: localStorage.getItem("nickname"),
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
      },
    });
  }, []);

  const login = ({ token, user }) => {
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
    localStorage.setItem("nickname", user.nickname);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);
    setIsLoggedIn(true);
    setUserInfo({ token, user });
  };
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserInfo(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
