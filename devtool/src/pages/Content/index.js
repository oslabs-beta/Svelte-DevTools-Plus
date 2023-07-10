import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

const inner = document.documentElement.innerHTML;
console.log(inner);

// Checks if website was built with Svelte
let useSvelte;
function checkSvelte() {
  const innerHTML = document.documentElement.innerHTML;
  if (innerHTML.toLowerCase().includes('svelte')) {
    console.log('The word "svelte" appears on this innerHTML.');
    useSvelte = true;
    return useSvelte;
  } else {
    console.log('The word "svelte" does not appear on this innerHTML.');
    useSvelte = false;
    return useSvelte;
  }
}
// checkSvelte();
// console.log('This info is index', useSvelte);

function init() {
  return new Promise((resolve) => {
    checkSvelte();
    resolve();
  });
}

init().then(() => {
  console.log('This info is index:', useSvelte);
});

export default inner;
