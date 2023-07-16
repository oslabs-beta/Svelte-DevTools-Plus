console.log('Content script ISOLATED works!');
console.log('Must reload extension for modifications to take effect.');

// Listening to messages from ContentScriptMain
// Forwarding messages to other parts of the extension
window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'content.js'
  ) {
    return;
  }
  switch (msg.data.type) {
    case 'forwardRootComponent':
      console.log('forwarding root component');
      // console.log(JSON.parse(JSON.stringify(messageData.rootComponent)));
      break;
    case 'forwardSvelteVersion':
      // svelteVersion = messageData.svelteVersion;
      console.log('forwarding svelte version');
      console.log('msg.data.svelteVersion', msg.data.svelteVersion);
      chrome.runtime.sendMessage({
        type: 'forwardSvelteVersion',
        svelteVersion: msg.data.svelteVersion,
      });
      break;
    default:
      break;
  }
});

// Listening for a message from Popup.jsx
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('GETTING SVELTE VERSION')
  if (request.message === 'get-svelte-version') {
    window.postMessage({
      // target: node.parent ? node.parent.id : null,
      type: 'getSvelteVersion',
      source: 'isolated.js',
    });
  }
});

// NOTE: If you're trying to send a message to a listener in a different
// part of the extension that hasn't been loaded yet, you'll get an error
// like "Unchecked runtime.lastError: Could not establish connection.
// Receiving end does not exist." This happened to Alex when he was
// trying to send a message to a listener inside the Panel component.
// The Panel component hadn't been rendered yet, so no listener had been added.
// Don't be like Alex
