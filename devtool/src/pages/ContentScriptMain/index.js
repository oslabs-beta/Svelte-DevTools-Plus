/*
  This is the MAIN content script! This is the script that gets injected into
  whatever webpage you're on. This means it not only has the ability to access
  the DOM, it can listen for events that get emitted from developer builds of
  Svelte applications.
*/

import { getNode, getSvelteVersion, getRootNodes } from 'svelte-listener';
import { v4 as uuidv4 } from 'uuid';

console.log('Welcome to Svelte DevTools+!');

/*
  TODO:
  State injection with arrays
  Highlight selected component on Step Display
  Profiler tab
  Icon color change when using/not using Svelte
  Add types to the tree visualization files
  Fix issue with overflow on step page

  IGNORE THIS:
  webpack dev server gives us many ugly red errors when we load a page.
  Ignore them; they're harmless. flipping the https option to true in
  webserver.js fixes this problem, but creates a worse one where the webpage
  refreshes endlessly. This doesn't happen in production builds anyway, so it's
  safe to ignore
*/

// Stolen from another Svelte DevTool to access props
// I don't know how it works.
function clone(value, seen = new Map()) {
  switch (typeof value) {
    case 'function':
      return { __isFunction: true, source: value.toString(), name: value.name };
    case 'symbol':
      return { __isSymbol: true, name: value.toString() };
    case 'object': {
      if (value === window || value === null) return null;
      if (Array.isArray(value)) return value.map((o) => clone(o, seen));
      if (seen.has(value)) return {};
      const o = {};
      seen.set(value, o);
      for (const [key, v] of Object.entries(value)) {
        o[key] = clone(v, seen);
      }
      return o;
    }
    default:
      return value;
  }
}

function gte(major, minor, patch) {
  const version = (getSvelteVersion() || '0.0.0')
    .split('.')
    .map((n) => parseInt(n));
  return (
    version[0] > major ||
    (version[0] == major &&
      (version[1] > minor || (version[1] == minor && version[2] >= patch)))
  );
}

let _shouldUseCapture = null;
function shouldUseCapture() {
  return _shouldUseCapture == null
    ? (_shouldUseCapture = gte(3, 19, 2))
    : _shouldUseCapture;
}
// End of stolen code

// This is a global variable to let us know if the page has been loaded or not
let pageLoaded = false;
// At this time, this content script only gets Svelte component data once
window.addEventListener('load', (event) => {
  pageLoaded = true;
});

// Gets the root component from svelte listener and returns
// a component tree starting with the root component
function traverseComponent(node) {
  let components = [];
  node.children.forEach((child) => {
    if (child.type === 'component' && child.detail.$$) {
      const serialized = {
        id: child.id,
        type: child.type,
        tagName: child.tagName,
        children: traverseComponent(child),
        uniqueId: uuidv4(),
      };
      // I stole this code from another Svelte DevTool because I didn't
      // know how to access props
      const internal = child.detail.$$;
      const props = Array.isArray(internal.props)
        ? internal.props // Svelte < 3.13.0 stored props names as an array
        : Object.keys(internal.props);
      let ctx = clone(
        shouldUseCapture() ? child.detail.$capture_state() : internal.ctx
      );
      if (ctx === undefined) ctx = {};
      serialized.detail = {
        attributes: props.flatMap((key) => {
          const value = ctx[key];
          delete ctx[key];
          return value === undefined
            ? []
            : { key, value, isBound: key in internal.bound };
        }),
        listeners: Object.entries(internal.callbacks).flatMap(
          ([event, value]) =>
            value.map((o) => ({ event, handler: o.toString() }))
        ),
        ctx: Object.entries(ctx).map(([key, value]) => ({ key, value })),
      };
      components.push(serialized);
      // End of stolen code
    } else {
      components = components.concat(traverseComponent(child));
    }
  });
  return components;
}

// Gets component tree using svelte listener and sends it to the dev tool panel
function sendRootNodeToExtension(messageType) {
  if (
    messageType !== 'updateRootComponent' &&
    messageType !== 'returnRootComponent' &&
    messageType !== 'returnTempRoot'
  ) {
    console.log(
      'You need a valid messageType in sendRootNodeToExtension() in ContentScriptMain/index.js'
    );
    return;
  }
  const rootNodes = getRootNodes();
  // console.log('rootNodes', rootNodes);
  const newRootNodes = traverseComponent({
    children: rootNodes,
    type: 'component',
  });
  if (!newRootNodes) {
    return;
  }
  // As far as I know, Svelte can only have one root node at a time
  const newRootNode = newRootNodes[0];
  // console.log('newRootNode', newRootNode);
  // Sends a message to ContentScriptIsolated/index.js
  window.postMessage({
    type: messageType,
    rootComponent: newRootNode,
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
    type: 'returnSvelteVersion',
    svelteVersion: svelteVersion,
    source: 'ContentScriptMain/index.js',
  });
}

function injectState(id, newState) {
  recentlyUpdated = true;
  setTimeout(() => {
    recentlyUpdated = false;
  }, 0);
  const component = getNode(id).detail;
  component.$inject_state(newState);

  /*
    Sends a new snapshot to the panel. If there is a state change that doesn't
    modify the DOM, the event listeners won't hear any events. Let's just send
    back a new updated root node for all state injections
  */
  sendRootNodeToExtension('updateRootComponent');
}

// When state is injected, an event is emitted by the Svelte app
// This forces the app to ignore those updates
let recentlyInjectedASnapshot = false;
function injectSnapshot(snapshot) {
  recentlyInjectedASnapshot = true;
  const listOfIds = [];
  const listOfStates = [];
  function getComponentData(component) {
    listOfIds.push(component.id);
    const newState = {};
    component.detail.ctx.forEach((i) => {
      newState[i.key] = i.value;
    });
    listOfStates.push(newState);
    component.children.forEach((child) => {
      getComponentData(child);
    });
  }
  getComponentData(snapshot);
  for (let i = 0; i < listOfIds.length; i++) {
    const component = getNode(listOfIds[i]);
    if (component) {
      const detail = component.detail;
      detail.$inject_state(listOfStates[i]);
    }
  }
  // When state is injected, an event is emitted by the Svelte app
  // This forces the app to ignore those updates
  recentlyUpdated = true;
  setTimeout(() => {
    recentlyUpdated = false;
    recentlyInjectedASnapshot = false;
  }, 0);
}

let readyForUpdates = false;
// Listens to events from ContentScriptIsolated/index.js and responds based on
// the event's type
window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'ContentScriptIsolated/index.js'
  ) {
    return;
  }
  const data = msg.data;
  switch (data.type) {
    case 'getSvelteVersion':
      sendSvelteVersionToExtension();
      break;
    case 'getRootComponent':
      readyForUpdates = true;
      sendRootNodeToExtension('returnRootComponent');
      break;
    case 'handleClosedPanel':
      readyForUpdates = false;
      break;
    case 'injectState':
      injectState(data.componentId, data.newState);
      break;
    case 'injectSnapshot':
      injectSnapshot(data.snapshot);
      // Before this setTimeout was added, we were sending back
      // a snapshot that hadn't been updated yet
      setTimeout(() => {
        sendRootNodeToExtension('returnTempRoot');
      }, 0);
      break;
  }
});

// Whenever nodes are updated, typically a bunch get updated at the same time
// I need to throttle updates so when I get a bunch at once, I only send the
// LATEST update
let recentlyUpdated = false;
function sendUpdateToPanel() {
  // This should only happen after the DOM is fully loaded
  // And after the Panel is loaded.
  if (!pageLoaded || !readyForUpdates) return;
  if (recentlyInjectedASnapshot) return;
  // This needs a setTimeout because it MUST run AFTER the svelte-listener events fire
  // Send the devtool panel an updated root component whenever the Svelte DOM changes
  if (recentlyUpdated === false) {
    setTimeout(() => {
      recentlyUpdated = false;
      sendRootNodeToExtension('updateRootComponent');
    }, 0);
    recentlyUpdated = true;
  }
}

window.document.addEventListener('SvelteRegisterComponent', sendUpdateToPanel);
window.document.addEventListener('SvelteRegisterBlock', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMInsert', (e) => sendUpdateToPanel);
window.document.addEventListener('SvelteDOMRemove', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetData', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetProperty', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetAttribute', sendUpdateToPanel);

// Here are some more Svelte listener events. Do we need them? Probably not,
// but they're here if you ever need them
// window.document.addEventListener('SvelteDOMAddEventListener', sendUpdateToPanel);
// window.document.addEventListener('SvelteDOMRemoveEventListener', sendUpdateToPanel);
// window.document.addEventListener('SvelteDOMRemoveAttribute', sendUpdateToPanel);
