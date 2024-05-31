
/*
 * Return the HTML representation of a node.
 * The node is an object that has text, url, and category attributes;
 * all of them optional.
 */
export default (node) => {
  let href = `href="${node.url}"`;

  // If url is not specified remove the href attribute,
  // so that the node isn't clickable, and the user can see that without
  // having to hover the node.
  if (!node.url) {
    href = '';
  }

  //return `<a id="node-${node.index}" ${href}>${node.text || ''} ${emoji}</a>`;
  return `<a id="node-${node.index}" ${href}>${node.text || ''} </a>`;
};
