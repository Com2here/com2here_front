import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  const locationNow = useLocation();

  if (locationNow.pathname === "/login" || locationNow.pathname === "/register")
    return null;

  return (
    <header>
      <div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
