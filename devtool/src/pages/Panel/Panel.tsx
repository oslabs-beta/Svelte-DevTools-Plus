import React, { useEffect, useState } from 'react';
import './Panel.css';
import SplitPane from 'react-split-pane';
import mockData from './mock-components.json';
import TreeComponent from './PanelComponents/TreeComponent';
import ComponentInfo from './PanelComponents/ComponentInfo';
const breakPoint = 50;

function Panel() {
  const [rootComponent, setRootComponent] = useState();

  console.log('rootComponent', rootComponent);

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('in listener in panel in component');
    if (request.type === 'addNode') {
      const node = request.node;
      console.log('request: ', request);
      setRootComponent(
        //@ts-ignore
        <TreeComponent
          component={node.component}
          children={node.children}
          componentProps={node.componentProps}
          componentState={node.componentState}
          level={0}
        />
      );
    }
  });

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
