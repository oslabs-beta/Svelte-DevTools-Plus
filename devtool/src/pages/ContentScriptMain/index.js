import {
  getNode,
  addNodeListener,
  startProfiler,
  stopProfiler,
  getSvelteVersion,
  getRootNodes,
} from 'svelte-listener';

// ALEX'S TODO LIST:
// Add ability to update state
// Fix all TS hacks, add typing to everything
// Add message to refresh the page on page load
// Fix icon and popup
// Highlight selected component

//KNOWN ISSUES WE'RE IGNORING:
// webpack dev server gives us many errors when we load a page. Ignore them. They're harmless
// flipping the https option to true in webserver.js fixes this problem, but creates a worse one
// This issue doesn't come up in production anyway, so it's safe to ignore

//Interesting observation: It looks like our calendar app takes some time
//to finish building itself. Maybe due to getting the date?
//Because of this it will not have the root nodes available when this content
//script is run. However, if we can add functionality to update our svelte component
//data whenever the DOM updates, this should be fixed.


// A global variable to let us know when the page has been loaded or not
let pageLoaded = false;
// At this time, this content script only gets Svelte component data once
window.addEventListener('load', (event) => {
  pageLoaded = true;
});

// Gets the root component from svelte listener and returns
// a component tree starting with the root component
function getRootComponent(root) {
  if (!root) return;
  const rootComponent = {
    component: root.tagName,
    componentState: null, //Get these later
    componentProps: null, //Get these later
    children: [],
  };
  function getSvelteComponent(element, lastComponent) {
    for (const child of element.children) {
      if (child.type === 'component') {
        const newChildComponent = {
          component: child.tagName,
          componentState: null, //Get these later
          componentProps: null, //Get these later
          children: [],
        };
        lastComponent.children.push(newChildComponent);
        lastComponent = newChildComponent;
      }
      getSvelteComponent(child, lastComponent);
    }
  }
  getSvelteComponent(root, rootComponent);
  return rootComponent;
}

// Gets component tree using svelte listener and sends it to the
// dev tool panel
function sendRootNodeToExtension() {
  const rootNode = getRootNodes()[0];
  const rootComponent = getRootComponent(rootNode);
  if (!rootComponent) {
    return;
  }
  // Sends a message to ContentScriptIsolated/index.js
  window.postMessage({
    // target: node.parent ? node.parent.id : null,
    type: 'returnRootComponent',
    rootComponent: rootComponent,
    source: 'ContentScriptMain/index.js',
  });
}

// Gets svelte version using svelte listener and sends it to
// the Popup box
function sendSvelteVersionToExtension() {
  const svelteVersion = getSvelteVersion();
  if (!svelteVersion) {
    return;
  }
  // Sends a message to ContentScriptIsolated/index.js
  window.postMessage({
    // target: node.parent ? node.parent.id : null,
    type: 'returnSvelteVersion',
    svelteVersion: svelteVersion,
    source: 'ContentScriptMain/index.js',
  });
}

// Listens to events from ContentScriptIsolated/index.js and
// responds based on the event's type
window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'ContentScriptIsolated/index.js'
  ) {
    return;
  }
  switch (msg.data.type) {
    case 'getSvelteVersion':
      sendSvelteVersionToExtension();
      break;
    case 'getRootComponent':
      sendRootNodeToExtension();
      break;
  }
});
