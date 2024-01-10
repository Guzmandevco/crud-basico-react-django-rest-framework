import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Toggle from "./Toggle";
import { AuthContext } from "../context/AuthProvider";
import { logoutIn } from "../api/connect.api";
function Header() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [activePage, setActiveLink] = useState(isAuth ? "Home" : "Login");

  useEffect(() => {
    // Actualizar el estado cuando cambia el contexto
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
    </header>
  );
}

export default Header;
