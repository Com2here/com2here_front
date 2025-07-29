import { useEffect, useState } from "react";

import api from "./useAxios";

export const useWishlist = () => {
  const axios = api;
  const [wishlistItems, setWishlistItems] = useState([]);

  // const getWishlist = async () => {
  //   try {
  //     const response = await api.get("/v1/product/wish/list");
  //     console.log("위시리스트 응답:", response);
  //     if (response.code === 200 && response.data?.products) {
  //       setWishlistItems(response.data.products);
  //     }
  //   } catch (error) {
  //     console.error("관심상품 목록 조회 실패:", error);
  //     setWishlistItems([]);
  //   }
  // };

  // useEffect(() => {
  //   getWishlist();
  // }, []);

  // const isInWishlist = (productId) => {
  //   return wishlistItems.some((item) => item.id === productId);
  // };

  const addToWishlist = async (productId) => {
    try {
      // const response = await axios.post(`/v1/product/wish/add/${productId}`);
      const response = await axios.post(`/v1/product/wish/add/1`);
      if (response.code === 200) {
        // await getWishlist(); // 위시리스트 목록 새로고침
        return { success: true };
      }
      return {
        success: false,
        error: response.message,
      };
    } catch (error) {
      const errorMessage =
        error.response?.message || "관심상품 담기에 실패했습니다.";
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  // return { addToWishlist, isInWishlist, wishlistItems };
  return { addToWishlist, wishlistItems };
};
