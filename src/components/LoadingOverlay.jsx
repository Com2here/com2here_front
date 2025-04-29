import ClipLoader from "react-spinners/ClipLoader";

import { useLoading } from "../contexts/LoadingContext";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "#00000088",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <ClipLoader color="#ffffff" size={70} />
    </div>
  );
};

export default LoadingOverlay;
