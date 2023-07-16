console.log("Content script ISOLATED works!");
console.log("Must reload extension for modifications to take effect.");

// This function forwards them to the Panel
window.addEventListener("message", async (msg) => {
  console.log('msg', msg)
  // console.log('msg.data', msg.data)
  if (
    typeof msg !== "object" ||
    msg === null ||
    msg.data?.source !== "content.js"
  ) {
    return;
  } else {
    setTimeout(() => {
    console.log('attempting to send a message')

      chrome.runtime.sendMessage(msg.data, (res) => {
        return;
      });

    }, 5000)
  }
});

// NOTE: If you're trying to send a message to a listener in a different 
// part of the extension that hasn't been loaded yet, you'll get an error
// like "Unchecked runtime.lastError: Could not establish connection. 
// Receiving end does not exist." This happened to Alex when he was 
// trying to send a message to a listener inside the Panel component. 
// The Panel component hadn't been rendered yet, so no listener had been added. Don't be like Alex