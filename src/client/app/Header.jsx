import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Search</Link></li>
        <li><Link to='/favorites'>Favorites</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header;