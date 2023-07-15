import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';


const Popup = () => {
  const [usingSvelte, setUsingSvelte] = useState(false);

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('in listener in pop up');
      if (request.type === 'this-app-is-using-svelte') {
        setUsingSvelte(true);
      }
    });

  return (
    <div>
      {usingSvelte ? (
        <p>This app is using Svelte</p>
      ) : (
        <p>
          This app is <strong>not</strong> using Svelte
        </p>
      )}
    </div>
  );
};

export default Popup;
