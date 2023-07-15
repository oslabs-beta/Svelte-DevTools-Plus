import React, { useEffect, useState } from 'react';
import '../Panel.css';
import TreeComponent from '../PanelComponents/TreeComponent';


chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {});

export default function StepPage() {
  const [rootComponent, setRootComponent] = useState(null);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      const response = await chrome.tabs.sendMessage(tab.id, {
        message: 'getPageComponents',
      });
      // do something with response here, not outside the function
      console.log('response', response);
      const root = response.rootComponent;
      console.log('root', root);
      setRootComponent(
        <TreeComponent
          component={root.component}
          children={root.children}
          componentProps={root.componentProps}
          componentState={root.componentState}
          level={0}
        />
      );
    })();
  }, []);

  return (
    <div className='pane'>
      <>
        <h1>Components</h1>
        {rootComponent}
      </>
    </div>
  );
}
