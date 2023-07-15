import React, { useEffect, useState } from 'react';
import '../Panel.css';
import TreeComponent from '../PanelComponents/TreeComponent';

export default function StepPage() {
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
    <div className='pane'>
      <>
        <h1>Components</h1>
        {rootComponent}
      </>
    </div>
  );
}
