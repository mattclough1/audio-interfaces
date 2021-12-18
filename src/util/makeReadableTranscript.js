function splitStringsOnSpaces(nodes) {
  return nodes.map((node) => (typeof node === 'string' ? node.split(' ') : node)).flat();
}

function filterNonEmptyNodes(nodes) {
  nodes.filter((item) => (typeof item === 'string' && item.length > 0) || item);
}

export function makeReadableTranscript(nodes) {}

class Script {
  constructor(nodes) {}

  get asStringArray() {}
}

// script.asStrings()
