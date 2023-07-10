import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import inner from '../Content';

const Popup = () => {
  let msg;
  console.log('this is useSvelte', inner, 'nedxt', inner);

  !false
    ? (msg =
        'This page doesn’t appear to be using Svelte. If this seems wrong, follow the troubleshooting instructions.')
    : (msg = 'This page uses Svelte :)');

  return <div className='App'>{msg}</div>;
};

export default Popup;
