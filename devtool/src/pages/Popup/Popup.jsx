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
      console.log('tab url', tab.url)
      if (tab.url.startsWith('chrome')) {
        setErrorMessage("This is a restricted browser page. Svelte DevTools+ cannot access this page.")
        return;
      }
      if (!tab.highlighted) return;
      chrome.tabs.sendMessage(tab.id, { message: 'get-svelte-version' });
    }
    getAppIsUsingSvelte();
  }, []);

  // Listen for response from ContentScriptIsolated
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.type === 'forwardSvelteVersion') {
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
