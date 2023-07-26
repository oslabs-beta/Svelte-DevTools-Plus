import React, { useEffect } from 'react';
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
import Rewinder from './PanelComponents/Rewinder';

export interface ComponentPageProps {
  rootComponentData: Component;
}

// Let the rest of the extension know that the panel is closed
// so it won't try and send messages to it
window.addEventListener('beforeunload', function() {
  chrome.runtime.sendMessage({message: "handleClosedPanel"});
});

function Panel() {
  const currentSnapshot: Snapshot = useSelector(selectCurrentSnapshot);
  const treeHistory: TreeHistory = useSelector(selectTreeHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    // I only want to add a listener once, so it goes in the set up useEffect
    // Listen for response from ContentScriptIsolated. This is where we
    // get the current tab's root Component, and update StepPage's state
    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message.type === 'updateRootComponent') {
        console.log('updated root')

        const rootComponent = message.rootComponent;
        if (rootComponent) {
          createAndSaveNewSnapshot(rootComponent);
        }
      } else if (message.type === 'returnRootComponent') {
        console.log('new root')
        const rootComponent = message.rootComponent;
        if (rootComponent) {
          createAndSaveNewSnapshot(rootComponent);
        } else {
          console.log('Error getting root component');
        }
        // For use after rewinding
      } else if (message.type === 'returnTempRoot') {
        const tempRoot = message.rootComponent;
        // set the tempRoot as the current snapshot without saving it
        dispatch({
          type: 'currentSnapshot/setCurrentSnapshot',
          payload: {
            rootComponent: tempRoot,
          },
        });
        
      }
    });
  }, []);

  function createAndSaveNewSnapshot(newRootComponent: Component) {
    console.log(
      'creating a new snapshot with this root node: ',
      newRootComponent
    );
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

  // Takes the snapshot in treeHistory[snapshotIndex] and injects state with all
  // of its component's state. Then the content script returns a "temp root component"
  // which gets displayed to the screen without saving a new snapshot
  async function changeSnapshot(snapshotIndex: number) {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.tabs.sendMessage(tab.id!, {
      message: 'injectSnapshot',
      snapshot: treeHistory.treeHistory[snapshotIndex],
    });
  }

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
          <div className="pane">
            <ComponentInfo />
          </div>
        </Split>
      </div>
      <Rewinder
        changeSnapshot={changeSnapshot}
        numberOfSnapshots={treeHistory.treeHistory.length}
      />
    </div>
  );
}

export default Panel;
