'use strict';

import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';

export default {

  getPageHost(window) {
    return window.location.hostname;
  },

  getPageUrl(window) {
    // TODO: what do we do about GET params that change the page contents?
    let url  = window.location.hostname + window.location.pathname,
        hash = window.location.hash;

    // if hash starts with '#/', assume it's unique route and append it to url
    if (/^(#\/)/.test(hash)) { url += (/\/$/.test(url)) ? hash : `\/${hash}`; }

    return url;
  },

  getSelection() {
    rangy.init();
    return rangy.getSelection();
  },

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

  getClassApplier(className) {
    rangy.init();
    return rangy.createClassApplier(className, {
      // TODO: remove hardcoded style;
      // let AnnotationApplier handle styling
      elementAttributes: { style: 'background-color: rgba(0,220,63,0.4)'}
    });
  },

  getClassApplierElements(classApplier, ranges) {
    return ranges
      .map(range => classApplier.getElementsWithClassIntersectingRange(range))
      .reduce((a,b) => a.concat(b));
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
