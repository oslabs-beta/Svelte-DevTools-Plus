import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import HomePage from './client/pages/HomePage';
import Login from './client/pages/Login';
import Signup from './client/pages/Signup';
import Account from './client/pages/Account';
import PageNotFound from './client/pages/PageNotFound';

const { useState } = require('react');
// const Style = require('./style.css');

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  console.log('user status', user);
  const loginHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(email, password);
    let user = await fetch('http://localhost:3000/loginUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const response = await user.json();
    console.log(response, 'response');
    setUser(response);
    console.log('user', user);
  };
  const gitHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let user = await fetch('http://localhost:3000/auth', {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
    });
    const response = await user.json();
    console.log(response, 'response token');
    setUser(response);
    console.log('user', user);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route
        path="/login"
        element={
          user === null ? (
            <Login
              loginHandler={loginHandler}
              passwordHandler={passwordHandler}
              emailHandler={emailHandler}
              gitHandler={gitHandler}
            />
          ) : user === true ? (
            <Account />
          ) : (
            <Signup />
          )
        }
      ></Route>
      <Route
        path="/signup"
        element={
          user === null ? (
            <Signup />
          ) : user === true ? (
            <Account />
          ) : (
            <Login
              loginHandler={loginHandler}
              passwordHandler={passwordHandler}
              emailHandler={emailHandler}
              gitHandler={gitHandler}
            />
          )
        }
      ></Route>
      <Route
        path="/account"
        element={user === true ? <Account /> : <HomePage />}
      ></Route>
      <Route path="/acc" element={<Account />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default App;
