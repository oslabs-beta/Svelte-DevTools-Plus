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
