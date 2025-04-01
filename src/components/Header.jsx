import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ROUTES } from "../constants/routes";

function Header() {
  const locationNow = useLocation();

  if (
    locationNow.pathname === ROUTES.LOGIN ||
    locationNow.pathname === ROUTES.REGISTER ||
    locationNow.pathname === ROUTES.RESET_PASSWORD
  )
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
