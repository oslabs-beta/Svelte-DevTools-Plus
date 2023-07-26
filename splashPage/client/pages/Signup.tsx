import React from 'react';
import Header from '../../ToDelete/Header';
const logo = require('../assets/logo.png');
import NavbarLogin from '../components/NavBarLogin';

type props = {
  signUpHandler: Function;
  passwordHandler: Function;
  emailHandler: Function;
  nameHandler: Function;
  lastNameHandler: Function;
};

const Signup = (props: props) => {
  const {
    signUpHandler,
    nameHandler,
    lastNameHandler,
    passwordHandler,
    emailHandler,
  } = props;
  return (
    <div className="signup">
      <NavbarLogin />
      <img src={logo} width="80" height="80" alt="Svelte Logo" />
      <h1>SvelteTool Plus</h1>
      <form>
        <input placeholder="name" onChange={(e) => nameHandler(e)}></input>
        <br />
        <input
          placeholder="lastName"
          onChange={(e) => lastNameHandler(e)}
        ></input>
        <br />
        <input placeholder="email" onChange={(e) => emailHandler(e)}></input>
        <br />
        <input
          placeholder="password"
          onChange={(e) => passwordHandler(e)}
        ></input>
        <br />
        <button className="loginButton" onClick={(e) => signUpHandler(e)}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default Signup;
