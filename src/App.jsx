import "./styles/App.css";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes/Router";
import { LoadingProvider } from "./contexts/LoadingContext.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";
import AxiosInterceptor from "./hooks/AxiosInterceptor.jsx";
import PageLoadSpinner from "./components/PageLoadSpinner.jsx";

function App() {
  return (
    <HelmetProvider>
      <LoadingProvider>
        <AxiosInterceptor>
          <AuthProvider>
            <BrowserRouter>
              <Router />
              <PageLoadSpinner />
              <LoadingOverlay />
            </BrowserRouter>
          </AuthProvider>
        </AxiosInterceptor>
      </LoadingProvider>
    </HelmetProvider>
  );
}

export default App;
