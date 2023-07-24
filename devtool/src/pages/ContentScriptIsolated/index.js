console.log(
  'Content script ISOLATED works! Must reload extension for modifications to take effect.'
);

let port = null;
// Listens to messages from ContentScriptMain
// and forwards them to other parts of the extension
window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'ContentScriptMain/index.js'
  ) {
    return;
  }
  switch (msg.data.type) {
    case 'updateRootComponent':
    case 'returnRootComponent':
    case 'returnTempRoot':
      chrome.runtime.sendMessage({
        type: msg.data.type,
        rootComponent: msg.data.rootComponent,
      });
      break;
    case 'returnSvelteVersion':
      chrome.runtime.sendMessage({
        type: msg.data.type,
        svelteVersion: msg.data.svelteVersion,
      });
      break;
    default:
      break;
  }
});

// Listens for a message from Popup.jsx and Panel.tsx
// Forwards them to ContentScriptMain/index.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.message) {
    case 'getRootComponent':
    case 'getSvelteVersion':
      window.postMessage({
        // target: node.parent ? node.parent.id : null,
        type: request.message,
        source: 'ContentScriptIsolated/index.js',
      });
      break;
    case 'injectState':
      window.postMessage({
        // target: node.parent ? node.parent.id : null,
        type: request.message,
        newState: request.newState,
        componentId: request.componentId,
        source: 'ContentScriptIsolated/index.js',
      });
      break;
    case 'injectSnapshot':
      window.postMessage({
        type: request.message,
        snapshot: request.snapshot,
        source: 'ContentScriptIsolated/index.js',
      });
      break;
  }
});

// NOTE: If you're trying to send a message to a listener in a different
// part of the extension that hasn't been loaded yet, you'll get an error
// like "Unchecked runtime.lastError: Could not establish connection.
// Receiving end does not exist." This happened to Alex when he was
// trying to send a message to a listener inside the Panel component.
// The Panel component hadn't been rendered yet, so no listener had been added.
// Don't be like Alex
