import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Toggle from "./Toggle";

import { logoutIn } from "../api/connect.api";
function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActiveLink] = useState(
    isAuthenticated ? "Home" : "Login"
  );
  useEffect(() => {
    // Actualizar el estado cuando cambia el contexto
    setIsAuthenticated(false);
    setActiveLink(isAuthenticated ? "Home" : "Login");
  }, [isAuthenticated]);

  // deleting jwt token from local storage
  const removeSessionId = (key) => localStorage.removeItem(key);
  const pagesList = isAuthenticated
    ? ["Home", "About", "Create", "DashBoard"]
    : ["Home", "About", "Login", "Register"];

  return (
    <header>
      <h1 className="logo">You Time</h1>

      <nav>
        <ul className="navbar">
          {pagesList.map((link, idx) => (
            <li key={idx}>
              <Link to={link === "Home" ? "/" : link.toLowerCase()}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
