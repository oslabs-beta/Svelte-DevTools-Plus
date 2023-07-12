console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('panel add listener');
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('sender.tab', sender.tab);
  console.log('Sending a response BACKGROUND');
  sendResponse({ farewell: 'This is my response' });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.condition === false) {
    // Set the specific 32x32 icon
    chrome.action.setIcon({ path: { 32: 'icon-gray-34.png' } });
  } else {
    // Set the default 32x32 icon
    chrome.action.setIcon({ path: { 32: 'icon-34.png' } });
  }
});
