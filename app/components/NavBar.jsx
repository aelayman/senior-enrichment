'use strict';
import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="logo"><img id="logo-image" src="/logo.png" /></div>
      <ul id="nav-links">
        <li className="nav-item">
          <Link to="/campuses">Campuses</Link>
        </li>
        <li className="nav-item">
          <Link to="/students">Students</Link>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;




