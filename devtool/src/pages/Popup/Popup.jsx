import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [svelteVersion, setSvelteVersion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //Get appIsUsingSvelte from ContentMain
  useEffect(() => {
    async function getAppIsUsingSvelte() {
      // Get tab the user is on
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      // Tabs without webpages on them (like new tabs and the extension page
      // All start like 'chrome://' We obviously can't get any DOM data from
      // them, so we'll exit the function here, and display an error message
      if (tab.url.startsWith('chrome://')) {
        setErrorMessage(
          'This is a restricted browser page. Svelte DevTools+ cannot access this page.'
        );
        return;
      }
      chrome.tabs.sendMessage(tab.id, { message: 'getSvelteVersion' });
    }
    getAppIsUsingSvelte();
  }, []);

  // Listen for response from ContentScriptIsolated
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.type === 'returnSvelteVersion') {
      // If message.svelteVersion is null, the app is not using Svelte
      if (message.svelteVersion) {
        console.log('setting svelte version to ', message.svelteVersion);
        setSvelteVersion(message.svelteVersion);
      }
    }
  });
  // This does not work because when the content script sends the message
  // the popup window is normally closed, meaning this Popup component
  // isn't loaded, so there's no listener

  // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   setMessageReceived(true);
  //   console.log('in listener in pop up');
  //   setUsingSvelte(true);
  //   sendResponse({response: "this is my response"})
  // });

  return (
    <div>
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div>
          {svelteVersion ? (
            <p>This app is using Svelte version: {svelteVersion}</p>
          ) : (
            <p>
              This app is <strong>not</strong> using Svelte
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Popup;
