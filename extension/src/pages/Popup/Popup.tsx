import React, { useEffect, useState } from 'react';
import './Popup.css';
import sendMessageToChrome from '../../messenger';

import google from '../../assets/img/google.png';

const Popup = () => {
  const [svelteVersion, setSvelteVersion] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Sends a message to ContentScriptIsolated, telling it to get the
    // current tab's Svelte version. If our response is null, that means
    // the app on the current tab is not using Svelte
    async function getSvelteVersion() {
      // Get tab the user is on
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      // Tabs without webpages on them (like new tabs and the extension page)
      // All start like 'chrome://' We obviously can't get any DOM data from
      // them, so we'll exit the function here, and display an error message
      if (tab.url!.startsWith('chrome://')) {
        setErrorMessage(
          'This is a restricted browser page. Svelte DevTools+ cannot access this page.'
        );
        return;
      }
      sendMessageToChrome('getSvelteVersion', { tab });
    }
    getSvelteVersion();
  }, []);

  // Listen for response from ContentScriptIsolated. This is where we
  // get the current tab's Svelte version, and update Popup's state
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'returnSvelteVersion') {
      // If message.svelteVersion is null, the app is not using Svelte
      if (message.svelteVersion) setSvelteVersion(message.svelteVersion);
    }
  });

  const openNewTab = () => {
    window.open('https://localhost:3001', '_blank');
  };

  return (
    <div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          {svelteVersion ? (
            <div>
              <p>
                This page is using Svelte!
                <br />
                Version: {svelteVersion}
              </p>
            </div>
          ) : (
            <p>
              This page is <strong>not</strong> using a development build of
              Svelte
            </p>
          )}
        </div>
      )}
      <div id="login-container">
        <p><strong>Login with</strong></p>
        <button
          aria-label="Google login"
          className="oauth-button"
          id="google"
          onClick={openNewTab}
        >
          <img alt="google" src={google} />
        </button>
      </div>
    </div>
  );
};

export default Popup;
