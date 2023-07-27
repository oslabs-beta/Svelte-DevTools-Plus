// console.log('This is the background page Put the background scripts here.');
// Send a message to the content script to let it know that
// the devtool is closed

chrome.runtime.onMessage.addListener(function (request) {
  // The following is your async call
  chrome.runtime.sendMessage({ message: 'handleClosedPanel' });
});
