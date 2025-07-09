// import { StrictMode } from "react";
import "./styles/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.MODE === "development") {
    import("./mocks/browser").then(({ worker }) => {
      // worker.start();
    });
  }
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
