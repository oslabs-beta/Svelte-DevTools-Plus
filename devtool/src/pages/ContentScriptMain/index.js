import {
  getNode,
  addNodeListener,
  startProfiler,
  stopProfiler,
  getSvelteVersion,
  getRootNodes,
} from 'svelte-listener';

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
  console.log('rootComponent', rootComponent);
  console.log('======================');

  return rootComponent;
}

// TODO:
// Get root component data to panel

// Remove comments
// Remove console logs
// Check if any other code I've written is unnecessary
// Be prepared to explain the code on Mondayyyyy

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

function sendRootNodeToExtension() {
  const rootNode = getRootNodes()[0];
  const rootComponent = getRootComponent(rootNode);
  console.log('new component data: ', rootComponent);
  if (!rootComponent) {
    return;
  }
  console.log('sending rootComponent: ', rootComponent);
  window.postMessage({
    // target: node.parent ? node.parent.id : null,
    type: 'forwardRootComponent',
    rootComponent: rootComponent,
    source: 'content.js',
  });
}

function sendSvelteVersionToExtension() {
  window.postMessage({
    // target: node.parent ? node.parent.id : null,
    type: 'forwardSvelteVersion',
    svelteVersion: getSvelteVersion(),
    source: 'content.js',
  });
}

// At this time, this content script only gets Svelte component data once
window.addEventListener('load', (event) => {
  initialLoadComplete = true;
  sendRootNodeToExtension();
  // sendSvelteVersionToExtension();
});

let initialLoadComplete = false;
function updateStore() {
  console.log('svelte event detected');
  if (initialLoadComplete) {
    sendRootNodeToExtension();
  }
}

window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'isolated.js'
  ) {
    return;
  }
  console.log('got a message from isolated')
  sendSvelteVersionToExtension();
});

window.document.addEventListener('SvelteRegisterComponent', updateStore);
window.document.addEventListener('SvelteRegisterBlock', updateStore);
window.document.addEventListener('SvelteDOMInsert', updateStore);
window.document.addEventListener('SvelteDOMRemove', updateStore);
window.document.addEventListener('SvelteDOMAddEventListener', updateStore);
window.document.addEventListener('SvelteDOMRemoveEventListener', updateStore);
window.document.addEventListener('SvelteDOMSetData', updateStore);
window.document.addEventListener('SvelteDOMSetProperty', updateStore);
window.document.addEventListener('SvelteDOMSetAttribute', updateStore);
window.document.addEventListener('SvelteDOMRemoveAttribute', updateStore);