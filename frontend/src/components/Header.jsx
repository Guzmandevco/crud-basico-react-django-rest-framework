import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import Toggle from './Toggle';
import { LoggingContext } from '../context/LogginContext.jsx';
import { logoutIn } from '../api/connect.api'
function Header() {
  const { loged, setLoged } = useContext(LoggingContext);
  const [isAuthenticated, setIsAuthenticated] = useState(loged);
  const [activePage, setActiveLink] = useState(isAuthenticated ? 'Home' : 'Login');

  useEffect(() => {
    // Actualizar el estado cuando cambia el contexto
    setIsAuthenticated(loged);
    setActiveLink(isAuthenticated ? 'Home' : 'Login');
  }, [loged, isAuthenticated]);
  
  // deleting jwt token from local storage
  const removeSessionId = key => localStorage.removeItem(key);
  const pagesList = isAuthenticated ? ['Home', 'About', 'Create', 'All'] : ['Home', 'About', 'Login', 'Register'];
  const logout = async () => {
    await logoutIn();
    removeSessionId('jwt');
    setIsAuthenticated(false);
    setLoged(false);
    localStorage.removeItem('user_id');
  }
  return (
    <header>
      <h1 className='logo'>You Time</h1>
      <div>
        <nav className="nav__container">
          <ul className="navbar">
            {
              pagesList.map(page => (
                <li className={`${activePage === page ? 'active' : ''}`} onClick={() => setActiveLink(page)} key={page}>
                  <Link to={`${page === 'Home' ? '/' : page.toLowerCase()}`} >{page}</Link>
                </li>
              ))
            }
            {
              loged ? (
            <li> <Link to={'/'} onClick={logout}>Logout</Link></li>
              ) : (null)
            }
          </ul>
        </nav>
        {/* Cambiar tema a negro o claro */}
        <Toggle />
      </div>
    </header>
  );
}

export default Header;
