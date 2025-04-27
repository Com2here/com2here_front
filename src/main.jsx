// import { StrictMode } from "react";
import "./styles/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

const queryClient = new QueryClient();

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode>, */}
    </QueryClientProvider>,
  );
});
