'use strict';

import rangy from 'rangy';

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

  deserialize(document, positions) {
    rangy.init();
    let rangePositions = positions.split('$');

    return rangePositions.map(position => {
      let [start, end, nodeId] = position.split(':');

      let containerNode = this._getNodeFromIdentifier(document, nodeId),
          bookmark = {start, end, containerNode},
          range = rangy.createRange();

      range.moveToBookmark(bookmark);

      return range;
    });
  },

  abbreviate(str, length) {
    return str.trim().replace(/\s+/g, ' ').substr(0, length);
  },

  _getNodeIdentifier(node) {
    return (node && node.nodeType === 1 && node.id) ? node.id : '/';
  },

  _getNodeFromIdentifier(document, nodeId) {
    if (nodeId === '/') { return document.body; }

    let el = document.getElementById(nodeId);
    return (el) ? el : null;
  }

};
