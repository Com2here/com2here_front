const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

const getRefreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  return token;
};

const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
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
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
};
