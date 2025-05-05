import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../hooks/useAxios";

const patchUserInfo = async (formData) => {
  const response = await api.patch("/v1/user/update", formData);
  return response.data;
};

export const useProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUserInfo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alert("성공적으로 저장되었어요!");
    },
    onError: (error) => {
      console.error("프로필 수정 실패: ", error);
    },
  });
};
