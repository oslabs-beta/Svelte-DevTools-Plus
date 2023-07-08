import React from 'react';
import './Panel.css';
import SplitPane from 'react-split-pane';
import mockData from './mock-components.json';
import TreeComponent from './PanelComponents/TreeComponent';
const breakPoint = 50;

function Panel() {

  function logMockData() : React.ReactElement {
    console.log(mockData)
    return (<TreeComponent 
      component={mockData.component}
      children={mockData.children}
      props={mockData.props}
      state={mockData.state}
      level={0}
      />);
  }
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
          <div className='pane'>
            <h1>Components</h1>
            {logMockData()}
          </div>
          <div className='pane'>
            <h2>State</h2>
            <h2>Props</h2>
          </div>
        </SplitPane>
      </div>
    </div>
  );
}

export default Panel;
