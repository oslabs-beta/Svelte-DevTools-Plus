import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './client/pages/HomePage';
import Login from './client/pages/Login';
import Signup from './client/pages/Signup';
import Account from './client/pages/Account';
import PageNotFound from './client/pages/PageNotFound';
// const Style = require('./style.css');

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/account" element={<Account />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default App;
