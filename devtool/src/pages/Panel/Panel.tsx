import React, { useState } from 'react';
import './Panel.css';
import Split from 'react-split';
import TreeComponent from './PanelComponents/TreeComponent';
import ComponentInfo from './PanelComponents/ComponentInfo';
const breakPoint = 50;

function Panel() {
  const [rootComponent, setRootComponent] = useState();

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
        <Split className="split"
          sizes={[25, 75]}
          minSize={100}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <div className="pane" style={{backgroundColor: "red"}}>
            <h1>Ceddddss</h1>
            {rootComponent}
          </div>
          <div>
            <ComponentInfo />
          </div>
        </Split>
      </div>
    </div>
  );
}

export default Panel;
