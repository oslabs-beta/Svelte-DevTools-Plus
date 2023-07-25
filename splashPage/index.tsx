import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// const Style = require('./style.css');
import Grid from '@mui/system/Unstable_Grid/Grid';
import './index.scss';

const root = createRoot(document.getElementById('root'));

ReactDOM.render(
  <Grid
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center',
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Grid>,
  document.getElementById('root')
);
