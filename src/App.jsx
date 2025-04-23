import "./styles/App.css";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";

import { Router } from "./routes/Router";
import { LoadingProvider } from "./contexts/LoadingContext.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";
import AxiosInterceptor from "./hooks/AxiosInterceptor.jsx";

function App() {
  return (
    <HelmetProvider>
      <LoadingProvider>
        <AxiosInterceptor>
          <AuthProvider>
            <Router />
            <LoadingOverlay />
          </AuthProvider>
        </AxiosInterceptor>
      </LoadingProvider>
    </HelmetProvider>
  );
}

export default App;
