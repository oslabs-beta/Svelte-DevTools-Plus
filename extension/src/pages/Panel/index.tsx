import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Panel from './Panel';
import './index.css';
import { store } from '../../../Store/store';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('app-container');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Panel />
    </BrowserRouter>
  </Provider>
);
