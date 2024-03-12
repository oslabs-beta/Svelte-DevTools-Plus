// console.log('This is the background page Put the background scripts here.');
// Send a message to the content script to let it know that
// the devtool is closed
console.log(chrome.runtime.getURL('grey-icon-34.png'));
console.log('background script')
chrome.action.setIcon({
  path: {
    "34": "grey-icon-34.png",
    "128": "grey-icon-128.png"
  }
}, function() {
  if (chrome.runtime.lastError) {
    console.log("Error setting icon: " + chrome.runtime.lastError.message);
  }
});

chrome.runtime.onMessage.addListener(function (request) {
  // The following is your async call
  chrome.runtime.sendMessage({ message: 'handleClosedPanel' });
});
