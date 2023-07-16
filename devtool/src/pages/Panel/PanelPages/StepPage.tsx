import React, { useEffect, useState } from 'react';
import '../Panel.css';
import TreeComponent from '../PanelComponents/TreeComponent';

console.log('ONE TWO STEP')
export default function StepPage() {
  const [rootComponent, setRootComponent] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getRootComponent() {
      // Get the tab the user is on
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
      });
      // Tabs without webpages on them (like new tabs and the extension page
      // All start like 'chrome://' We obviously can't get any DOM data from
      // them, so we'll exit the function here, and display an error message
      //@ts-ignore
      chrome.tabs.sendMessage(tab.id, {message: 'getRootComponent'});
    }
    getRootComponent();
  }, [])

    // Listen for response from ContentScriptIsolated
    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message.type === 'returnRootComponent') {
        // If message.svelteVersion is null, the app is not using Svelte
        const rootComponent = message.rootComponent;
        if (message.rootComponent) {
          setRootComponent(
            //@ts-ignore
            <TreeComponent
              component={rootComponent.component}
              children={rootComponent.children}
              componentProps={rootComponent.componentProps}
              componentState={rootComponent.componentState}
              level={0}
            />
          );
        } else {
          console.log('error getting root component. not sure why this happened')
        }
      }
    });



  return (
    <div className='pane'>
      <>
        <h1>Components</h1>
        {rootComponent}
      </>
    </div>
  );
}
