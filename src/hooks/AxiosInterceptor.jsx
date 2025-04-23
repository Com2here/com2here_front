import { useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import api from "./useAxios.js"; // 위에 작성한 axios 인스턴스

const AxiosInterceptor = ({ children }) => {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        setIsLoading(true);
        return config;
      },
      (error) => {
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsLoading]);

  return children;
};

export default AxiosInterceptor;
