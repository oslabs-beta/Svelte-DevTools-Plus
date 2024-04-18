import React, { useEffect, useState } from 'react';
import './Panel.css';
import Split from 'react-split';
import ComponentInfo from './PanelComponents/ComponentInfo/ComponentInfo';
import Navbar from './PanelComponents/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TreePage from './PanelPages/TreePage/TreePage';
import ListPage from './PanelPages/ListPage/ListPage';
import { Component } from './slices/highlightedComponentSlice';
import { useSelector } from 'react-redux';
import { selectCurrentSnapshot } from './slices/currentSnapshotSlice';
import { useDispatch } from 'react-redux';
import { TreeHistory, selectTreeHistory } from './slices/treeHistorySlice';
import Rewinder from './PanelComponents/Rewinder/Rewinder';
import { selectEvents } from './slices/timedEventsSlice';
import sendMessageToChrome from '../../messenger';

export interface ComponentPageProps {
  rootComponentData: Component;
}

// Let the rest of the extension know that the panel is closed
// so it won't try and send messages to it
window.addEventListener('beforeunload', function () {
  sendMessageToChrome('handleClosedPanel');
});

function Panel() {
  const currentSnapshot = useSelector(selectCurrentSnapshot);
  const treeHistory: TreeHistory = useSelector(selectTreeHistory);
  const eventTimes: number[] = useSelector(selectEvents);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unableToGetComponentData, setUnableToGetComponentData] =
    useState(false);
  // Navigate to the root directory on page load
  useEffect(() => {
    navigate('/');
  }, []);

  console.log("eventTimes", eventTimes);

  useEffect(() => {
    async function setUpPanel() {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          lastFocusedWindow: true,
        });
        dispatch({
          type: 'timedEvents/addNewEvent',
          payload: {
            type: 'sendMessage',
            data: performance.now(),
          },
        });
        if (tab && tab.id !== undefined) {
          sendMessageToChrome('getRootComponent', { tab });
        }
      } catch (err) {
        console.log(err);
      }
    }


    // I only want to add a listener once, so qit goes in the onMount useEffect
    // Listens for response from ContentScriptIsolated. This is where we
    // get the current tab's root component, and process updates
    function messageListener(message: any) {
      dispatch({
        type: 'timedEvents/addNewEvent',
        payload: {
          type: 'receiveMessage',
          data: performance.now(),
        },
      });
      if (message.type === 'updateRootComponent') {
        const rootComponent = message.rootComponent;
        if (rootComponent) {
          createAndSaveNewSnapshot(rootComponent);
        }
      } else if (message.type === 'returnRootComponent') {
        const rootComponent = message.rootComponent;
        if (rootComponent) {
          createAndSaveNewSnapshot(rootComponent);
        } else {
          setUnableToGetComponentData(true);
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
    }
    chrome.runtime.onMessage.addListener(messageListener);
    setUpPanel();
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  function createAndSaveNewSnapshot(newRootComponent: Component) {
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

  /*
    Takes the snapshot in treeHistory[snapshotIndex] and injects state with all
    of its component's state. Then the content script returns a "temp root component"
    which gets displayed to the screen without saving a new snapshot
  */
  async function changeSnapshot(snapshotIndex: number) {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      dispatch({
        type: 'timedEvents/addNewEvent',
        payload: {
          type: 'sendMessage',
          data: performance.now(),
        },
      });
      sendMessageToChrome('injectSnapshot', {
        snapshot: treeHistory.treeHistory[snapshotIndex],
        tab,
      });
    } catch (err) {
      console.log('Error getting tab: ', err);
    }
  }

  function clearSnapshotHistory() {
    dispatch({
      type: 'treeHistory/deleteAllSnapshots',
    });
  }

  return (
    <div className="container" data-testid="panel">
      <div className="page-content">
        <Split className="split">
          <div className="pane">
            <header>
              <Navbar />
            </header>
            {unableToGetComponentData ? (
              <h1 id="no-data-error" data-testid="no-data-error">
                Unable to get component data
              </h1>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <ListPage
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
            )}
          </div>
          <div>
            <ComponentInfo />
          </div>
        </Split>
      </div>
      <Rewinder
        changeSnapshot={changeSnapshot}
        numberOfSnapshots={treeHistory.treeHistory.length}
        clearSnapshotHistory={clearSnapshotHistory}
      />
    </div>
  );
}

export default Panel;
