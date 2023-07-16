import {
  getNode,
  addNodeListener,
  startProfiler,
  stopProfiler,
  getSvelteVersion,
  getRootNodes,
} from "svelte-listener";

// ALEX'S TODO LIST:
// Fix all TS hacks, add typing to everything
// all jsx is now tsx. Search for every @ts-ignore and any then
// use your brain to figure out how to fix them


// Have app respond to changes in the DOM

// Changing tabs doesn't update the devtool panel. It does update the popup window though
// I believe this is because the popup window closes when I change tabs
// When I change tabs, the devtool window doesn't reset. Can I force it to reset
// whenever the user switches tabs?

// How can we split up tasks in the Devtool?
// Style Component steps
// Profiler tab
// modify state and props
// D3 component tree
// Fix icon color change
// Highlight selected component
// Style nav bar; default selection should be step

//KNOWN ISSUES WE'RE IGNORING:
// webpack dev server gives us many ugly red errors when we load a page. Ignore them. They're harmless
// flipping the https option to true in webserver.js fixes this problem, but creates a worse one
// This issue doesn't come up in production anyway, so it's safe to ignore

// A global variable to let us know when the page has been loaded or not
let pageLoaded = false;
// At this time, this content script only gets Svelte component data once
window.addEventListener("load", (event) => {
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
      if (child.type === "component") {
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
    type: "returnRootComponent",
    rootComponent: rootComponent,
    source: "ContentScriptMain/index.js",
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
    type: "returnSvelteVersion",
    svelteVersion: svelteVersion,
    source: "ContentScriptMain/index.js",
  });
}

// Listens to events from ContentScriptIsolated/index.js and
// responds based on the event's type
window.addEventListener("message", async (msg) => {
  if (
    typeof msg !== "object" ||
    msg === null ||
    msg.data?.source !== "ContentScriptIsolated/index.js"
  ) {
    return;
  }
  switch (msg.data.type) {
    case "getSvelteVersion":
      sendSvelteVersionToExtension();
      break;
    case "getRootComponent":
      sendRootNodeToExtension();
      break;
  }
});

// Send the devtool panel an updated root component whenever the Svelte DOM changes
function sendUpdate() {
  return;
  console.log("send update");
  if (!pageLoaded) return;
  // TODO: Okay here's the problem. Whenever I call this function, I send
  // the updated root node to the DevTool panel. But what happens when
  // the panel is closed? The app crashes.

  // All the data I need is stored in svelte listener
  // How do I send updated data to the extension as soon as it updates?
  // Let's set up a listener for updates in the Devtool
  // Whenever I get an update, send it to this listener from here

  // How is this different from the setup I have now?
  // In my current Devtool listener, it's set up to process data on page load
  // I need to do something different to handle an update
  sendRootNodeToExtension();
}

// window.document.addEventListener('SvelteRegisterComponent', updateStore);
// window.document.addEventListener('SvelteRegisterBlock', updateStore);
window.document.addEventListener("SvelteDOMInsert", sendUpdate);
window.document.addEventListener("SvelteDOMRemove", sendUpdate);
// window.document.addEventListener('SvelteDOMAddEventListener', updateStore);
// window.document.addEventListener('SvelteDOMRemoveEventListener', updateStore);
window.document.addEventListener("SvelteDOMSetData", sendUpdate);
window.document.addEventListener("SvelteDOMSetProperty", sendUpdate);
// window.document.addEventListener('SvelteDOMSetAttribute', updateStore);
// window.document.addEventListener('SvelteDOMRemoveAttribute', updateStore);
