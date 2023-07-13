import {
  getNode,
  addNodeListener,
  startProfiler,
  stopProfiler,
  getSvelteVersion,
  getRootNodes,
} from './svelte-listener.js';

function getPageComponentData(root) {
  console.log('======================');
  console.log('root', root);
  console.log();
  const rootComponent = {
    component: root.tagName,
    componentState: null, //Get these later
    componentProps: null, //Get these later
    children: [],
  };
  function getSvelteComponent(element, lastComponent) {
    for (const child of element.children) {
      if (child.type === 'component') {
        const newChildComponent = {
          component: child.tagName,
          componentState: null, //Get these later
          componentProps: null, //Get these later
          children: [],
        };
        lastComponent.children.push(newChildComponent);
        lastComponent = newChildComponent;
      }
      getSvelteComponent(child, lastComponent);
    }
  }
  getSvelteComponent(root, rootComponent);
  console.log('rootComponent', rootComponent);
  console.log('======================');

  return rootComponent;
}

setTimeout(() => {
  const rootNode = getRootNodes()[0];
  console.log('rootNode', rootNode);
  const result = getPageComponentData(rootNode);
  console.log('result', result);
  // Parse through the root node here

  window.postMessage({
    // target: node.parent ? node.parent.id : null,
    type: 'addNode',
    node: result,
    source: 'content.js',
  });
}, 100);
