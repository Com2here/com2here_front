import { createContext, useContext, useEffect, useState } from "react";

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
  const isDev = import.meta.env.MODE === "development";
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // if (isDev) {
    //   setIsLoggedIn(true);
    //   setUserInfo({
    //     token: {
    //       accessToken: "dev-access-token",
    //       refreshToken: "dev-refresh-token",
    //     },
    //     user: {
    //       nickname: "devuser",
    //       email: "dev@com2here.com",
    //       role: "ADMIN",
    //     },
    //   });
    //   setIsLoading(false);
    //   return;
    // }
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
    setIsLoading(false);
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
    <AuthContext.Provider
      value={{ isLoggedIn, userInfo, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
