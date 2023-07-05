console.log('helloooooo wurrldddd')
chrome.devtools.panels.create("My Panel",
    null,
    "devtools.html",
    function(panel) {
      // code invoked on panel creation
      console.log("creating panel!")
    }
);