import { Link } from 'react-router-dom';
import { useState } from "react";
import Toggle from './Toggle';
function Header() {
    const pagesList = ['Home', 'Create', 'All'];
    const [activePage, setActiveLink] = useState(pagesList[0])
    return(
        <header>
            <h1 className='logo'>TodoList</h1>
            <ul>
                {
                    pagesList.map(page => (
                        <li className={`${activePage == page ? 'active' : ''}`} onClick={() => setActiveLink(page)} key={page}>{ <Link to={`${page == 'Home' ? '/' : page.toLowerCase()}`}>{ page }</Link> }</li>
                    ))
                }
            </ul>
            < Toggle/>
        </header>
    )
}

export default Header;