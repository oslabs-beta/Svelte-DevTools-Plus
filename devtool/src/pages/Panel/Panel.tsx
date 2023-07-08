import React from 'react';
import './Panel.css';
import SplitPane from 'react-split-pane';
import mockData from './mock-components.json';
import TreeComponent from './PanelComponents/TreeComponent';
import { selectSelectedComponent } from './slices/selectedComponentSlice';
import { useSelector } from 'react-redux';
const breakPoint = 50;

function Panel() {
  function showMockData(): React.ReactElement {
    return (
      <TreeComponent
        component={mockData.component}
        children={mockData.children}
        props={mockData.props}
        state={mockData.state}
        level={0}
      />
    );
  }

  const selectedComponent = useSelector(selectSelectedComponent);
  console.log('selectedComponent', selectedComponent);

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
            {showMockData()}
          </div>
          <div className="pane">
            <h2>{selectedComponent.component}</h2>
            <h3>State</h3>
              {selectedComponent.state &&
                Object.keys(selectedComponent.state).map((i) => {
                  return (
                    <div style={{ display: 'flex' }}>
                      <div>{i}:</div>
                      <div>{selectedComponent.state[i]}</div>
                    </div>
                  );
                })}
                <h3>Props</h3>
                  {selectedComponent.props &&
                    Object.keys(selectedComponent.props).map((i) => {
                      return (
                        <div style={{ display: 'flex' }}>
                          <div>{i}:</div>
                          <div>{selectedComponent.props[i]}</div>
                        </div>
                      );
                    })}
                    

          </div>
        </SplitPane>
      </div>
    </div>
  );
}

export default Panel;
