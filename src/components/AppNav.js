import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

const AppNav = () => {
    return (
        <React.Fragment>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark px-sm-5">
          <Link to='/'>
            <span className='navbar-brand'>CodeMirror React</span>
          </Link>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5 ">
              <Link to='/xml' className='nav-link'>
                XML
              </Link>
            </li>
            <li className="nav-item ml-5 ">
              <Link to='/js' className='nav-link'>
                JS
              </Link>
            </li>
          </ul>
        </nav>
        </React.Fragment>
      )
}

export default AppNav;