import ignored from './ignored';

function createElementTreeWalker (element) {
  return document.createTreeWalker(
    element,
    NodeFilter.SHOW_ELEMENT,
    function (node) {
      return ignored(node) ?
        NodeFilter.FILTER_REJECT :
        NodeFilter.FILTER_ACCEPT;
    },
    true
  );
}

export default function (elements, callback) {
  var elementsLength = elements.length;
  for (var a = 0; a < elementsLength; a++) {
    var element = elements[a];

    // We screen the root node only. The rest of the nodes are screened in the
    // tree walker.
    if (element.nodeType !== 1 || ignored(element)) {
      continue;
    }

    // The tree walker doesn't include the current element.
    callback(element);

    var elementWalker = createElementTreeWalker(element);
    while (elementWalker.nextNode()) {
      callback(elementWalker.currentNode);
    }
  }
}
