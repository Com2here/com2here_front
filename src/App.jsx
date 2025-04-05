import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { Router } from "./routes/Router";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
