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

  const addToWishlist = async (product) => {
    try {
      const payload = {
        cpu: product.cpu,
        gpu: product.gpu,
        image: product.image,
        line: product.line,
        link: product.link,
        mall: product.mall,
        price: product.price,
        naverProductId: product.productId,
        title: product.title,
        totalPrice: product.totalPrice,
        totalScores: product.totalScores,
      };

      console.log("추가 요청할 상품:", product);

      const response = await api.post("/v1/product/wish/add", payload);

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
