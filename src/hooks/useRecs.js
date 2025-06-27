import { useState } from "react";

import api from "./useAxios.js";

export const useRecs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const getRecommendations = async (purpose, programs, budget) => {
    setLoading(true);
    setError(null);

    try {
      const requestData = {
        purpose,
        programs,
        ...(budget && { budget }),
      };

      console.log("API 요청 데이터:", requestData);

      const response = await api.post("/v1/recommend", requestData);
      setRecommendations(response.data);
      return response.data;
    } catch (err) {
      let errorMessage = "추천 요청 중 오류가 발생했습니다.";

      if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    recommendations,
    getRecommendations,
  };
};
