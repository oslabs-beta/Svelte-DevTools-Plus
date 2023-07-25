import {
  getNode,
  addNodeListener,
  startProfiler,
  stopProfiler,
  getSvelteVersion,
  getRootNodes,
} from 'svelte-listener';
import { getAllNodes } from 'svelte-listener/src';

// Stolen from another Svelte DevTool to access props
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

// TODO LIST:

// NEXT:
// State injection is broken with the improved right panel
// fix it and make it work with arrays

// THEN:
// Right pane doesn't automatically update when I time travel
// Instead of updating the state and just being done with it,
// it should create a snapshot, then load it

// Use useRef to keep track of which components are opened and closed
// refs can persist data between renders

// Style Component steps
// Profiler tab
// modify props?
// Fix icon color change
// Style nav bar; default selection should be step

//KNOWN ISSUES WE'RE IGNORING:
// webpack dev server gives us many ugly red errors when we load a page. Ignore them. They're harmless
// flipping the https option to true in webserver.js fixes this problem, but creates a worse one
// This issue doesn't come up in production anyway, so it's safe to ignore

// A global variable to let us know when the page has been loaded or not
let pageLoaded = false;
// At this time, this content script only gets Svelte component data once
window.addEventListener('load', (event) => {
  pageLoaded = true;
});

const rootComponentHistory = [];

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
    } else {
      components = components.concat(traverseComponent(child));
    }
  });
  return components;
}

// Gets component tree using svelte listener and sends it to the
// dev tool panel
function sendRootNodeToExtension(messageType) {
  if (
    messageType !== 'updateRootComponent' &&
    messageType !== 'returnRootComponent' &&
    messageType !== 'returnTempRoot'
  ) {
    console.log(
      'You need a valid messageType in sendRootNodeToExtension() in ContentScriptMain/index.js'
    );
    console.log('messageType', messageType);
    return;
  }
  const rootNodes = getRootNodes();
  console.log('rootNodes', rootNodes);

  // Let's get the board component and see what we can do with it
  // const boardComponent = rootNodes[0].children[0].children[2];
  // console.log('boardComponent', boardComponent);
  // const result = boardComponent.detail.$capture_state();
  // console.log('result', result);

  const newRootNodes = traverseComponent({
    children: rootNodes,
    type: 'component',
  });
  if (!newRootNodes) {
    return;
  }
  // As far as I know, Svelte can only have one root node at a time
  const newRootNode = newRootNodes[0];

  console.log('newRootNode', newRootNode);
  // Sends a message to ContentScriptIsolated/index.js
  window.postMessage({
    // target: node.parent ? node.parent.id : null,
    type: messageType,
    rootComponent: newRootNode,
    source: 'ContentScriptMain/index.js',
  });
}

function sendTempRootToExtension() {
  const rootNodes = getRootNodes();
  const newRootNodes = traverseComponent({
    children: rootNodes,
    type: 'component',
  });
  const newRootNode = newRootNodes[0];
  window.postMessage({
    type: 'returnTempRoot',
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
    // target: node.parent ? node.parent.id : null,
    type: 'returnSvelteVersion',
    svelteVersion: svelteVersion,
    source: 'ContentScriptMain/index.js',
  });
}

function injectState(id, newState) {
  const component = getNode(id).detail;
  component.$inject_state(newState);
}

function injectSnapshot(snapshot) {
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
    const component = getNode(listOfIds[i]).detail;
    component.$inject_state(listOfStates[i]);
  }
  // When state is injected, an event is emitted by the Svelte app
  // This forces the app to ignore those updates
  recentlyUpdated = true;
  setTimeout(() => {
    recentlyUpdated = false;
  }, 0);
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
  const data = msg.data;
  switch (data.type) {
    case 'getSvelteVersion':
      sendSvelteVersionToExtension();
      break;
    case 'getRootComponent':
      sendRootNodeToExtension('returnRootComponent');
      break;
    case 'injectState':
      injectState(data.componentId, data.newState);
      break;
    case 'injectSnapshot':
      injectSnapshot(data.snapshot);
      sendRootNodeToExtension('returnTempRoot');
      break;
  }
});

// Whenever nodes are updated, typically a bunch get updated at the same time
// I need to throttle updates so when I get a bunch at once, I only send the
// LATEST update
let recentlyUpdated = false;
function sendUpdateToPanel() {
  // This should only happen after the DOM is fully loaded
  if (!pageLoaded) return;
  console.log('here comes an update!');
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

// I might not need these?
window.document.addEventListener('SvelteDOMInsert', (e) => sendUpdateToPanel);
window.document.addEventListener('SvelteDOMRemove', sendUpdateToPanel);

// window.document.addEventListener('SvelteDOMAddEventListener', sendUpdateToPanel);
// window.document.addEventListener('SvelteDOMRemoveEventListener', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetData', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetProperty', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetAttribute', sendUpdateToPanel);
// window.document.addEventListener('SvelteDOMRemoveAttribute', sendUpdateToPanel);
