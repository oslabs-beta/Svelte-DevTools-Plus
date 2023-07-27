import React from 'react';
import Header from '../../Parking/Header';
import NavbarLogin from '../components/NavBarLogin';
import '../assets/css/style.css';
const gitHubLogo = require('../assets/github.svg');
const logo = require('../assets/svelte-devtool-logo (2).png');
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
    <div className='login'>
      <NavbarLogin />
      <img src={logo} width='100px' height='100px' alt='Svelte Logo' />
      <h1>Login</h1>
      <form>
        <input
          placeholder='email'
          onChange={(e) => {
            emailHandler(e);
          }}
        ></input>
        <br />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => {
            passwordHandler(e);
          }}
        ></input>
        <br />
        <button className='loginButton' onClick={(e) => loginHandler(e)}>
          Login
        </button>

        <div className='oauthBox'>
          <a className='outhButton' href='http://localhost:3000/auth'>
            <button className='loginButton'>
              <img src={gitHubLogo} alt='gitHub Logo' />
              Log in with GitHub
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};
export default Login;
