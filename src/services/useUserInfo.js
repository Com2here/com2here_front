import { useQuery } from "@tanstack/react-query";

import { MYPAGE_PROFILE_ERROR_MESSAGES } from "../constants/errors";
import api from "../hooks/useAxios";

// 프로필 조회
const useUserProfile = async () => {
  try {
    const response = await api.get("/v1/user/show");
    const { code, data } = response;
    if (code === 200) {
      return data;
    } else if (code in MYPAGE_PROFILE_ERROR_MESSAGES) {
      alert(MYPAGE_PROFILE_ERROR_MESSAGES[code]);
      if (code !== 500) {
        throw new Error("Relogin required");
      }
    }
  } catch (error) {
    if (error.message !== "Relogin required") {
      alert("알 수 없는 오류가 발생했습니다.");
      console.error(error);
    }
    throw error;
  }
};

export const User = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: useUserProfile,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 0,
    cacheTime: 10 * 60 * 1000, // 10분
  });
};
