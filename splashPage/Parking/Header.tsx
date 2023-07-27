import React from 'react';
const logo = require('../assets/logo.png');

const Header = () => {
  return (
    <div className="header">
      <img src={logo} width="80" height="80" alt="Svelte Logo" />
      <h1>SvelteTool Plus</h1>
      <p>Vesion 1.0</p>
      <button className="downloadButton">
        <a href="https://www.w3schools.com/">Donwload</a>
      </button>
    </div>
  );
};

export default Header;
