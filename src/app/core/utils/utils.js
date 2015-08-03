'use strict';

export default {

  serialize(selection, containerNode) {
    let ranges = selection.getAllRanges(),
        nodeId = this._getNodeIdentifier(containerNode);

    return ranges
      .map((range) => range.getBookmark(containerNode))
      .filter((bookmark) => bookmark.start !== bookmark.end)
      .map((bookmark) => bookmark.start + ':' + bookmark.end + ':' + nodeId)
      .reduce((a, b) => a + '$' + b);
  },

  abbreviate(str, length) {
    return str.trim().replace(/\s+/g, ' ').substr(0, length);
  },

  _getNodeIdentifier(node) {
    return (node && node.nodeType === 1 && node.id) ? node.id : '/';
  }

};
