import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './client/pages/HomePage';
import Login from './client/pages/Login';
import Signup from './client/pages/Signup';
import Account from './client/pages/Account';
import PageNotFound from './client/pages/PageNotFound';
import Navbar from './client/components/NavBar';
import MainHeader from './client/components/MainHeader';
// const Style = require('./style.css');

const App = () => {
  return (
    <div className='App'>
      <Navbar  />
      <MainHeader  />
    </div>
  );
};

export default App;


  /* <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/account" element={<Account />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes> */

