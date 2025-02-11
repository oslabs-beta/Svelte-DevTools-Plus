import React, { useEffect, useState } from 'react';
import './Panel.css';
import Split from 'react-split';
import ComponentInfo from './PanelComponents/ComponentInfo/ComponentInfo';
import Navbar from './PanelComponents/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TreePage from './PanelPages/TreePage/TreePage';
import ListPage from './PanelPages/ListPage/ListPage';
import { Component } from '../../../Store/slices/highlightedComponentSlice';
import { useSelector } from 'react-redux';
import { selectCurrentSnapshot } from '../../../Store/slices/currentSnapshotSlice';
import { useDispatch } from 'react-redux';
import {
  TreeHistory,
  selectTreeHistory,
} from '../../../Store/slices/treeHistorySlice';
import Rewinder from './PanelComponents/Rewinder/Rewinder';
import {
  selectEvents,
  TimedEventsState,
} from '../../../Store/slices/timedEventsSlice';
import sendMessageToChrome from '../../messenger';

export interface ComponentPageProps {
  rootComponentData: Component;
}

// Let the rest of the extension know that the panel is closed
// so it won't try and send messages to it
window.addEventListener('beforeunload', function () {
  sendMessageToChrome('handleClosedPanel');
});

let updatedEventTimes: any = null;

function Panel() {
  const currentSnapshot = useSelector(selectCurrentSnapshot);
  const treeHistory: TreeHistory = useSelector(selectTreeHistory);
  const timedEventsState: TimedEventsState = useSelector(selectEvents);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unableToGetComponentData, setUnableToGetComponentData] =
    useState(false);
  const [lastUpdateMessage, setLastUpdateMessage] = useState('');
  // Navigate to the root directory on page load

  useEffect(() => {
    navigate('/');
  }, []);

  useEffect(() => {
    const eventTimes = timedEventsState.eventTimes;
    if (eventTimes.length === 0) return;
    const num = eventTimes[eventTimes.length - 1];
    let time = num.toFixed(2);
    setLastUpdateMessage('Last update took ' + time + 'ms');
    updatedEventTimes = timedEventsState.eventTimes;
  }, [timedEventsState.eventTimes]);

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

    async function returnProfilingData() {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      sendMessageToChrome('returnProfilingData', {
        tab,
        eventTimes: updatedEventTimes,
      });
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
      } else if (message.type === 'getProfilingData') {
        returnProfilingData();
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
              <div id="left-pane">
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
                <div>
                  <p id="last-update-message">{lastUpdateMessage}</p>
                </div>
              </div>
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
