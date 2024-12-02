<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Navbar from '../Navbar/Navbar.svelte';
  import ComponentInfo from '../ComponentInfo/ComponentInfo.svelte';
  import TreePage from '../../PanelPages/TreePage/TreePage.svelte';
  import ListPage from '../../PanelPages/ListPage/ListPage.svelte';
  import Rewinder from '../Rewinder/Rewinder.svelte';
  import {
    currentSnapshot,
    treeHistory,
  } from '../../Store/store';
  import sendMessageToChrome from '../../../../../../../messenger';
  import { addNewSnapshot, deleteAllSnapshots } from '../../Store/treeHistory';
  import { setCurrentSnapshot } from '../../Store/currentSnapshot';
    import { addNewEvent } from '../../Store/timedEvents';
    import { get } from 'svelte/store';

  let unableToGetComponentData = false;
  let lastUpdateMessage = '';

  window.addEventListener('beforeunload', () => {
    sendMessageToChrome('handleClosedPanel');
  });

  window.addEventListener('message', (event: MessageEvent) => {
    const { type, rootComponent } = event.data;
    if (type === 'updateRootComponent' && rootComponent) {
      setCurrentSnapshot(rootComponent);
      addNewSnapshot(rootComponent);
    } else if (type === 'returnRootComponent') {
      if (!rootComponent) {
        unableToGetComponentData = true;
      } else {
        setCurrentSnapshot(rootComponent);
      }
    } else if (type === 'returnProfilingData') {
      lastUpdateMessage = `Last update took ${event.data.time}ms`;
    }
  });

  async function changeSnapshot(snapshotIndex: number) {
    try {
      console.log('chrome', chrome);
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      addNewEvent({
          type: 'sendMessage',
          data: performance.now(),
        })
      sendMessageToChrome('injectSnapshot', {
        snapshot: get(treeHistory).treeHistory[snapshotIndex],
        tab,
      });
    } catch (err) {
      console.log('Error getting tab: ', err);
    }
  }

  function clearSnapshotHistory() {
    deleteAllSnapshots();
  }


  onDestroy(() => {
    window.removeEventListener('beforeunload', () => {});
    window.removeEventListener('message', () => {});
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="./Panel.css" />
</svelte:head>

<div class="container" data-testid="panel">
  <div class="split">
    <div class="pane">
      <header>
        <Navbar />
      </header>
      {#if unableToGetComponentData}
        <h1 id="no-data-error" data-testid="no-data-error">
          Unable to get component data
        </h1>
      {:else}
        <nav>
          <div id="left-pane">
            <a href="/">
              <ListPage rootComponentData={get(currentSnapshot)} />
            </a>
            <a href="/tree">
              <TreePage rootComponentData={get(currentSnapshot)} />
            </a>
          </div>
        </nav>
        <p id="last-update-message">{lastUpdateMessage}</p>
      {/if}
    </div>
    <div>
      <ComponentInfo />
    </div>
  </div>
  <Rewinder
    {changeSnapshot}
    numberOfSnapshots={get(treeHistory).treeHistory.length}
    {clearSnapshotHistory}
  />
</div>
