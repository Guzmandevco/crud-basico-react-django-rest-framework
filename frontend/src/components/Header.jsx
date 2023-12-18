import { Link } from 'react-router-dom';
import { useState } from "react";
import Toggle from './Toggle';
function Header() {
    const pagesList = ['Home', 'About', 'Create', 'All'];
    const [activePage, setActiveLink] = useState(pagesList[0])
    return(
        <header>
            <h1 className='logo'>You Time</h1>
            <div>
              <nav className="nav__container">
                <ul className="navbar">
                  {
                    pagesList.map(page => (
                        <li className={`${activePage == page ? 'active' : ''}`} onClick={() => setActiveLink(page)} key={page}>{ <Link to={`${page == 'Home' ? '/' : page.toLowerCase()}`}>{ page }</Link> }</li>
                    ))
                  }
                </ul>
              </nav>
              { /* Change theme into black or ligth */ }
              <Toggle/>
            </div>
        </header>
    )
}

export default Header;