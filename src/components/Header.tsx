// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Custom CSS for styling

const Header: React.FC = () => {
  return (
    <header className='header'>
      <h1 className='title'>
        Sivathiapuram-Sivagalai Nadar Clan Ancestral Tree
      </h1>
      <nav className='navbar'>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/tree2'>Left-Right View</Link>
          </li>
          <li>
            <Link to='/contact'>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
