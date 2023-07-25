import React from 'react';
import Header from '../components/Header';
const logo = require('../assets/logo.png');

const Signup = () => {
  return (
    <div className="signup">
      <img src={logo} width="80" height="80" alt="Svelte Logo" />
      <h1>SvelteTool Plus</h1>
      <form>
        <input placeholder="name"></input>
        <br />
        <input placeholder="lastName"></input>
        <br />
        <input placeholder="email"></input>
        <br />
        <input placeholder="password"></input>
        <br />
        <button className="loginButton">SinUp</button>
      </form>
    </div>
  );
};
export default Signup;
