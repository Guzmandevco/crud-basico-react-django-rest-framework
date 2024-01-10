import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Toggle from "./Toggle";
<<<<<<< HEAD
=======
import { AuthContext } from "../context/AuthProvider";
import { logoutIn } from "../api/connect.api";
function Header() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [activePage, setActiveLink] = useState(isAuth ? "Home" : "Login");
>>>>>>> auth

import { logoutIn } from "../api/connect.api";
function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActiveLink] = useState(
    isAuthenticated ? "Home" : "Login"
  );
  useEffect(() => {
    // Actualizar el estado cuando cambia el contexto
<<<<<<< HEAD
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
=======
    //setIsAuth(true);
    setActiveLink(isAuth ? "Home" : "Login");
  }, [isAuth]);

  // deleting jwt token from local storage
  const removeSessionId = (key) => localStorage.removeItem(key);
  const pagesList = isAuth
    ? ["Home", "About", "Create", "All"]
    : ["Home", "About", "Login", "Register"];
  const logout = async () => {
    console.log("ok");
  };
  return (
    <header>
      <h1 className="logo">You Time</h1>
      <div>
        <nav className="nav__container">
          <ul className="navbar">
            {pagesList.map((page) => (
              <li
                className={`${activePage === page ? "active" : ""}`}
                onClick={() => setActiveLink(page)}
                key={page}
              >
                <Link to={`${page === "Home" ? "/" : page.toLowerCase()}`}>
                  {page}
                </Link>
              </li>
            ))}
            {isAuth ? (
              <li>
                {" "}
                <Link to={"/"} onClick={logout}>
                  Logout
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
        {/* Cambiar tema a negro o claro */}
        <Toggle />
      </div>
>>>>>>> auth
    </header>
  );
}

export default Header;
