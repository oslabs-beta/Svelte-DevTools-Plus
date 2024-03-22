console.log('This is the background page Put the background scripts here.');

// Send a message to the content script to let it know that
// the devtool is closed
function greyOutIcon() {
  chrome.action.setIcon(
    {
      path: {
        34: 'grey-icon-34.png',
        128: 'grey-icon-128.png',
      },
    },
    function () {
      if (chrome.runtime.lastError) {
        console.log('Error setting icon: ' + chrome.runtime.lastError.message);
      }
    }
  );
}

async function updateIcon(activeInfo) {
  greyOutIcon();
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  chrome.tabs.sendMessage(tab.id, { message: 'getSvelteVersion' });
}
chrome.tabs.onUpdated.addListener(updateIcon);
chrome.tabs.onActivated.addListener(updateIcon);

chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === 'returnSvelteVersion') {
    // If message.svelteVersion is null, the app is not using Svelte
    if (message.svelteVersion) {
      chrome.action.setIcon(
        {
          path: {
            34: 'icon-34.png',
            128: 'icon-128.png',
          },
        },
        function () {
          if (chrome.runtime.lastError) {
            console.log(
              'Error setting icon: ' + chrome.runtime.lastError.message
            );
          }
        }
      );
    }
  }
});

chrome.runtime.onMessage.addListener(function (request) {
  chrome.runtime.sendMessage({ message: 'handleClosedPanel' });
});

greyOutIcon();
