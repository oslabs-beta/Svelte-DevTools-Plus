import React, { useState } from 'react';
import './Panel.css';
import Split from 'react-split';
import TreeComponent from './PanelComponents/TreeComponent';
import ComponentInfo from './PanelComponents/ComponentInfo';
import Navbar from './PanelComponents/Navbar';
import { Routes, Route, redirect } from 'react-router-dom';
import TreePage from './PanelPages/TreePage';
import StepPage from './PanelPages/StepPage';
const breakPoint = 50;

function Panel() {
  const [rootComponent, setRootComponent] = useState();

  // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   console.log('in listener in panel in component');
  //   if (request.type === 'addNode') {
  //     const node = request.node;
  //     console.log('request: ', request);
  //     setRootComponent(
  //       //@ts-ignore
  //       <TreeComponent
  //         component={node.component}
  //         children={node.children}
  //         componentProps={node.componentProps}
  //         componentState={node.componentState}
  //         level={0}
  //       />
  //     );
  //   }
  // });

  return (
    <div className='container'>
      <div id='content'>
        {/* @ts-ignore */}
        <Split
        >
          <div className='pane'>
            <Navbar />
            <Routes>
              <Route path='/' element={<StepPage />} />
              <Route path='/tree' element={<TreePage />} />
            </Routes>
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
