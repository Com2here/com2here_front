const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

const getRefreshToken = () => {
  const localToken = localStorage.getItem("refreshToken");
  if (localToken) return localToken;

  const sessionToken = sessionStorage.getItem("refreshToken");
  return sessionToken;
};

const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const setRefreshToken = (token) => {
  // 세션스토리지에 토큰이 있으면 세션스토리지에 저장, 없으면 로컬스토리지에 저장
  if (sessionStorage.getItem("refreshToken")) {
    sessionStorage.setItem("refreshToken", token);
  } else {
    localStorage.setItem("refreshToken", token);
  }
};

const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

export {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
};
