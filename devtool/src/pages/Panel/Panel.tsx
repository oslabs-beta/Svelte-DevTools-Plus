import React from 'react';
import './Panel.css';
import SplitPane from 'react-split-pane';
import mockData from './mock-components.json';
import TreeComponent from './PanelComponents/TreeComponent';
import ComponentInfo from './PanelComponents/ComponentInfo';
const breakPoint = 50;

function Panel() {
  const rootComponent =  <TreeComponent
  component={mockData.component}
  children={mockData.children}
  componentProps={mockData.componentProps}
  componentState={mockData.componentState}
  level={0}
/>

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
