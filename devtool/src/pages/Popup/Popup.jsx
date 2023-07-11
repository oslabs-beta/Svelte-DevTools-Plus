import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {});

const Popup = () => {
  const [usingSvelte, setUsingSvelte] = useState(false);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      const response = await chrome.tabs.sendMessage(tab.id, {
        message: 'getUsingSvelte',
      });
      // do something with response here, not outside the function
      console.log('response', response);
      console.log('response.usingSvelte', response.usingSvelte);
      setUsingSvelte(response.usingSvelte);
    })();
  }, []);

  return (
    <div>
      {usingSvelte ? (
        <p>This app is probably using Svelte</p>
      ) : (
        <p>This app is not using Svelte</p>
      )}
    </div>
  );
};

export default Popup;
