import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
printLine("Using the 'printLine' function from the Print Module");

// This gets run as the content script
// I should be able to add more by adding a new output file to options.entry
// in webpack and adding that file to manifest.json (static declaration)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const pageComponentData = getPageComponentData();
  if (request.message === 'getPageComponents')
    sendResponse({ rootComponent: pageComponentData.rootComponent });
  else if (request.message === 'getUsingSvelte')
    sendResponse({ usingSvelte: pageComponentData.usingSvelte });
});

function getPageComponentData() {
  const root = document.documentElement;
  const body = root.children[1];
  let appIsUsingSvelte = false;
  function getSvelteComponent(element) {
    const children = [];
    for (const childComponent of element.children) {
      const elementClass = childComponent.getAttribute('class');
      if (
        elementClass &&
        (elementClass.startsWith('svelte-') || elementClass.startsWith('s-'))
      ) {
        appIsUsingSvelte = true;
      }
      children.push(getSvelteComponent(childComponent));
    }
    return {
      component: element.tagName,
      componentState: null, //Get these later
      componentProps: null, //Get these later
      children: children,
    };
  }

  return {
    rootComponent: getSvelteComponent(body),
    usingSvelte: appIsUsingSvelte,
  };
}