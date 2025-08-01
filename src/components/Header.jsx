import { useLocation } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import Navbar from "./Navbar";

function Header() {
  const locationNow = useLocation();

  if (
    locationNow.pathname === ROUTES.LOGIN ||
    locationNow.pathname === ROUTES.REGISTER ||
    locationNow.pathname === ROUTES.HELP.FIND_PW
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
