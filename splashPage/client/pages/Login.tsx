import React from 'react';
import Header from '../../ToDelete/Header';
import NavbarLogin from '../components/NavBarLogin';
const logo = require('../assets/logo.png');
const gitHubLogo = require('../assets/github.svg');
// const { useState } = require('react');
type props = {
  loginHandler: Function;
  passwordHandler: Function;
  emailHandler: Function;
  // gitHandler: Function;
};
const Login = (props: props) => {
  const { loginHandler, passwordHandler, emailHandler } = props;

  return (
    <div className="login">
      <NavbarLogin />
      <img src={logo} width="80" height="80" alt="Svelte Logo" />
      <h1>SvelteTool Plus</h1>
      <form>
        <input
          placeholder="email"
          onChange={(e) => {
            emailHandler(e);
          }}
        ></input>
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            passwordHandler(e);
          }}
        ></input>
        <br />
        <button className="loginButton" onClick={(e) => loginHandler(e)}>
          Login
        </button>
        <br />
        <p>or</p>
        <hr />
        <div className="oauthBox">
          <a className="outhButton" href="http://localhost:3000/auth">
            <img src={gitHubLogo} width="20" height="20" alt="gitHub Logo" />
            <p>Log in with GitHub</p>
          </a>
        </div>
      </form>
    </div>
  );
};
export default Login;
