import React, { useEffect, useState } from 'react';
import './Panel.css';
import Split from 'react-split';
import ComponentInfo from './PanelComponents/ComponentInfo';
import Navbar from './PanelComponents/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TreePage from './PanelPages/TreePage';
import StepPage from './PanelPages/StepPage';
import { Component } from './slices/highlightedComponentSlice';

export interface ComponentPageProps {
  rootComponentData: Component;
}

function Panel() {
  const [rootComponentData, setRootComponentData] = useState(null);
  const navigate = useNavigate();

  // Navigate to the root directory on page load
  useEffect(() => {
    navigate('/');
  }, []);

  useEffect(() => {
    // Sends a message to ContentScriptIsolated, telling it to get the
    // current tab's root component
    async function getRootComponent() {
      // Get the tab the user is on
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      chrome.tabs.sendMessage(tab.id!, { message: 'getRootComponent' });
    }
    getRootComponent();
  }, []);

  // Listen for response from ContentScriptIsolated. This is where we
  // get the current tab's root Component, and update StepPage's state
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.type === 'updateRootComponent') {
      const rootComponent = message.rootComponent;
      if (rootComponent) {
        console.log('updating root component data');
        setRootComponentData(rootComponent);
      }
    } else if (message.type === 'returnRootComponent') {
      const rootComponent = message.rootComponent;
      console.log('rootComponent in panel', rootComponent)
      if (rootComponent) {
        console.log('setting root component data');
        setRootComponentData(rootComponent);
      } else {
        console.log('Error getting root component');
      }
    }
  });

  return (
    <div className="container">
      <div id="content">
        <Split className="split">
          <div className="pane">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<StepPage rootComponentData={rootComponentData!} />}
              />
              <Route
                path="/tree"
                element={<TreePage rootComponentData={rootComponentData!} />}
              />
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
