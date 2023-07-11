import React, { useEffect, useState } from 'react';
import './Panel.css';
import SplitPane from 'react-split-pane';
import mockData from './mock-components.json';
import TreeComponent from './PanelComponents/TreeComponent';
import ComponentInfo from './PanelComponents/ComponentInfo';

const breakPoint = 50;

chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {});

function Panel() {
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
    <div className="container">
      <div id="content">
        {/* @ts-ignore */}
        <SplitPane
          split="vertical"
          minSize={breakPoint}
          maxSize={-breakPoint}
          defaultSize={parseInt(String(localStorage.getItem('splitPos')), 10)}
          onChange={(size) => localStorage.setItem('splitPos', String(size))}
        >
          <div className="pane">
            <h1>Components</h1>
            {rootComponent}
          </div>
          <ComponentInfo />
        </SplitPane>
      </div>
    </div>
  );
}

export default Panel;
