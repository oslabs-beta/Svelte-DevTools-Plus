import React from 'react';
const error404 = require('../assets/error404.png');

const PageNotFound = () => {
  return (
    <div>
      <img src={error404} width="150" height="150" alt="sad face error 404" />
      <h1>Page not Found</h1>
      <h1>404</h1>
    </div>
  );
};

export default PageNotFound;
