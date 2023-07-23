import React, { useEffect, useState } from 'react';
import './Panel.css';
import Split from 'react-split';
import ComponentInfo from './PanelComponents/ComponentInfo';
import Navbar from './PanelComponents/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TreePage from './PanelPages/TreePage';
import StepPage from './PanelPages/StepPage';
import { Component } from './slices/highlightedComponentSlice';
import { useSelector } from 'react-redux';
import { selectCurrentSnapshot, Snapshot } from './slices/currentSnapshotSlice';
import { useDispatch } from 'react-redux';
import { TreeHistory, selectTreeHistory } from './slices/treeHistorySlice';

export interface ComponentPageProps {
  rootComponentData: Component;
}

function Panel() {
  const currentSnapshot: Snapshot = useSelector(selectCurrentSnapshot);
  const treeHistory: TreeHistory = useSelector(selectTreeHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('treeHistory', treeHistory);

  // Navigate to the root directory on page load
  useEffect(() => {
    navigate('/');
  }, []);

  useEffect(() => {
    async function setUpPanel() {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      chrome.tabs.sendMessage(tab.id!, { message: 'getRootComponent' });
    }
    setUpPanel();
  }, []);

  function createNewSnapshot(newRootComponent: Component) {
    console.log('creating a new snapshot');
    dispatch({
      type: 'currentSnapshot/setCurrentSnapshot',
      payload: {
        rootComponent: newRootComponent,
      },
    });
    dispatch({
      type: 'treeHistory/addNewSnapshot',
      payload: {
        newSnapshot: newRootComponent,
      },
    });
  }

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
        // setRootComponentData(rootComponent);
        createNewSnapshot(rootComponent);
      }
    } else if (message.type === 'returnRootComponent') {
      const rootComponent = message.rootComponent;
      console.log('rootComponent in panel', rootComponent);
      if (rootComponent) {
        console.log('setting root component data');
        // setRootComponentData(rootComponent);
        createNewSnapshot(rootComponent);
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
                element={
                  <StepPage
                    rootComponentData={currentSnapshot.rootComponent!}
                  />
                }
              />
              <Route
                path="/tree"
                element={
                  <TreePage
                    rootComponentData={currentSnapshot.rootComponent!}
                  />
                }
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
