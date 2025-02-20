import React from 'react';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#profiles">Profiles</a>
        </li>
        <li style={{ marginLeft: 'auto' }}>
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;