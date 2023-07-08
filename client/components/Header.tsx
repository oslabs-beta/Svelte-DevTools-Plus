import React from 'react';
const logo = require('../assets/logo.png');

const Header = () => {
  return (
    <div className="header">
      <img src={logo} width="50" height="50" alt="Svelte Logo" />
      <h1>SvelteTool Plus</h1>
      <p>Vesion 1.0</p>
    </div>
  );
};

export default Header;
