import * as React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './client/pages/HomePage';
import Login from './client/pages/Login';
import Signup from './client/pages/Signup';
import Account from './client/pages/Account';
import PageNotFound from './client/pages/PageNotFound';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

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

  const signUpHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(email, password);
    let user = await fetch('http://localhost:3000/signUpNewUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, lastName, email, password }),
    });
    const response = await user.json();
    console.log(response, 'response');
    setUser(response);
    console.log('user', user);
  };
  // const gitHandler = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   let user = await fetch('http://localhost:3000/auth', {
  //     method: 'GET',
  //     // headers: { 'Content-Type': 'application/json' },
  //     mode: 'no-cors',
  //   });
  //   const response = await user.json();
  //   console.log(response, 'response token');
  //   setUser(response);
  //   console.log('user', user);
  // };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
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
            />
          ) : user === true ? (
            <Account />
          ) : (
            <Signup
              signUpHandler={signUpHandler}
              passwordHandler={passwordHandler}
              emailHandler={emailHandler}
              nameHandler={nameHandler}
              lastNameHandler={lastNameHandler}
            />
          )
        }
      ></Route>
      <Route
        path="/signup"
        element={
          user === null ? (
            <Signup
              signUpHandler={signUpHandler}
              passwordHandler={passwordHandler}
              emailHandler={emailHandler}
              nameHandler={nameHandler}
              lastNameHandler={lastNameHandler}
            />
          ) : user === true ? (
            <Account />
          ) : (
            <Login
              loginHandler={loginHandler}
              passwordHandler={passwordHandler}
              emailHandler={emailHandler}
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
