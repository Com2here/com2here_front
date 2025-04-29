import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useLoading } from "../contexts/LoadingContext";

const PageLoadSpinner = () => {
  const location = useLocation();
  const { setIsLoading } = useLoading();

  // 1. 페이지 이동 시 로딩이 300ms동안(무조건) 나오게 하는 방법(test용)
  // useEffect(() => {
  //   setIsLoading(true);
  //
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 300);
  //
  //   return () => clearTimeout(timer);
  // }, [location.pathname]);

  // 2. 랜더링을 감지하고 페이지가 지연될 때 로딩 페이지가 나오게 하는 방법(배포용)
  useEffect(() => {
    setIsLoading(true);

    const raf = requestAnimationFrame(() => {
      setIsLoading(false);
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [location.pathname]);

  return null;
};

export default PageLoadSpinner;
