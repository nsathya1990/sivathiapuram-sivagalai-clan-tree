// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Custom CSS for styling

const Header: React.FC = () => {
  return (
    <header className='header'>
      <h1>Sivathiapuram-Sivagalai Nadar Clan Ancestral Tree</h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Tree 1</Link>
          </li>
          <li>
            <Link to='/tree2'>Tree 2</Link>
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
