import { useQuery } from "@tanstack/react-query";

import api from "../hooks/useAxios";

// 서버에서 프로필 불러오기
const getUser = async () => {
  try {
    const response = await api.get("/v1/user/show");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const User = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 2,
    cacheTime: 10 * 60 * 1000, // 10분
  });
};
