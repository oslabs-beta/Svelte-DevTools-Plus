import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './client/components/NavBar';
import MainHeader from './client/components/MainHeader';
import Features from './client/components/Features';
import Press from './client/components/Press';
import Contributor from './client/components/Contributor';

// const { useState } = require('react');
// const Style = require('./style.css');

const App = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  // console.log('user status', user);

  // const loginHandler = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   console.log(email, password);
  //   let user = await fetch('http://localhost:3000/loginUser', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const response = await user.json();
  //   console.log(response, 'response');
  //   setUser(response);
  //   console.log('user', user);
  // };
  // const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setPassword(e.target.value);
  // };
  // const emailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(e.target.value);
  // };

  return (
    <div className='App'>
      <Navbar />
      <MainHeader />
      <Features />
      <Press />
      <Contributor />
    </div>
  );
};

export default App;

/* <Routes>
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
            />
          )
        }
      ></Route>
      <Route
        path="/account"
        element={user === true ? <Account /> : <HomePage />}
      ></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes> */

// <Route path="/" element={<HomePage />}></Route>
//   <Route
//     path="/login"
//     element={
//       user === null ? (
//         <Login
//           loginHandler={loginHandler}
//           passwordHandler={passwordHandler}
//           emailHandler={emailHandler}
//         />
//       ) : user === true ? (
//         <Account />
//       ) : (
//         <Signup />
//       )
//     }
//   ></Route>
//   <Route
//     path="/signup"
//     element={
//       user === null ? (
//         <Signup />
//       ) : user === true ? (
//         <Account />
//       ) : (
//         <Login
//           loginHandler={loginHandler}
//           passwordHandler={passwordHandler}
//           emailHandler={emailHandler}
//         />
//       )
//     }
//   ></Route>
//   <Route
//     path="/account"
//     element={user === true ? <Account /> : <HomePage />}
//   ></Route>
//   <Route path="*" element={<PageNotFound />}></Route>
// </Routes>
