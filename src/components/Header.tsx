// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaBars } from 'react-icons/fa'; // Import a menu icon

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header'>
      <h1 className='title'>Sivathiapuram-Sivagalai Nadar Family Tree</h1>
      <nav className='navbar'>
        {/* Menu icon for mobile */}
        <div className='menu-icon' onClick={toggleMenu}>
          <FaBars />
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to='/'>Ancestors (male)</Link>
          </li>
          <li>
            <Link to='/left-right'>Whole family</Link>
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
