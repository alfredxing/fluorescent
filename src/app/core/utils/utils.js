'use strict';

export default {

  forIn(obj, fn) {
    for (let prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        fn(prop, obj[prop]);
      }
    }
  },

  getPageHost(window) {
    return window.location.hostname;
  },

  getPageUrl(window) {
    // TODO: what do we do about GET params that change the page contents?
    let url  = window.location.hostname + window.location.pathname,
        hash = window.location.hash;

    // normalize url by removing trailing '/' character if one exists
    if (/\/$/.test(url)) { url = url.slice(0,-1); }
    // if hash contains a '/', assume it's a unique route and append it to url
    if (/^#.*\//.test(hash)) { url += '/' + hash; }

    return url;
  },

  hexToRGB(hex) {
    let [,r,g,b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16)
    };
  },

  getSelectedRange(document) {
    let selection = document.getSelection(),
        range     = (selection.rangeCount > 0) ? selection.getRangeAt(0) : null;

    selection.removeAllRanges();
    return range;
  },

  serialize(document, range) {
    let container = null || document.body,
        preRange  = new Range();

    preRange.selectNodeContents(container);
    preRange.setEnd(range.startContainer, range.startOffset);

    let start  = preRange.toString().length,
        end    = start + range.toString().length,
        nodeId = this._getNodeIdentifier(container);

    return start + ':' + end + ':' + nodeId;
  },

  deserialize(document, position) {
    let [start, end, nodeId] = position.split(':');

    let container = this._getNodeFromIdentifier(document, nodeId),
        range     = new Range();

    range.setStart(container, 0); range.collapse(true);

    let nodeStack = [container], node, foundStart = false, stop = false,
        charIndex = 0, nextCharIndex, i, childNodes;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        nextCharIndex = charIndex + node.length;
        if (!foundStart && start >= charIndex && start <= nextCharIndex) {
          range.setStart(node, start - charIndex);
          foundStart = true;
        }
        if (foundStart && end >= charIndex && end <= nextCharIndex) {
          range.setEnd(node, end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        childNodes = node.childNodes;
        i = childNodes.length;
        while (i--) { nodeStack.push(childNodes[i]); }
      }
    }

    return range;
  },

  applyClassToRange(document, range, className) {
    let textNodes = this._getTextNodesInRange(document, range),
        startNode = textNodes[0],
        endNode   = textNodes[textNodes.length - 1];

    let els = textNodes.map(textNode =>
      this._getAncestorWithClass(textNode, className) ||
      this._wrapTextNode(document, textNode, className)
    );
    range.setStart(startNode, 0); range.setEnd(endNode, endNode.length);
    return els;
  },

  unapplyClassToRange(document, range, className) {
    let textNodes = this._getTextNodesInRange(document, range);
    textNodes.map(textNode =>
      this._unwrapTextNode(document, textNode, className)
    );
    range.commonAncestorContainer.normalize();
  },

  abbreviate(str, length) {
    return str.trim().replace(/\s+/g, ' ').substr(0, length);
  },

  _wrapTextNode(document, textNode, className) {
    let parent = textNode.parentNode,
        span   = document.createElement('span');

    span.classList.add(className);
    parent.insertBefore(span, textNode);
    span.appendChild(textNode);
    return span;
  },

  _unwrapTextNode(document, textNode, className) {
    let el = this._getAncestorWithClass(textNode, className);
    if (el) { this._unwrap(el); }
  },

  _unwrap(el) {
    let parent  = el.parentNode;
    while (el.firstChild) { parent.insertBefore(el.firstChild, el); }
    parent.removeChild(el);
  },

  _getNodeIndex(node) {
    var i = 0; while (!!(node = node.previousSibling)) { ++i; }
    return i;
  },

  _splitRangeBoundaries(range) {
    let sc = range.startContainer, so = range.startOffset,
        ec = range.endContainer, eo = range.endOffset,
        startEndSame = (sc === ec);

    if (ec.nodeType === 3 && eo > 0 && eo < ec.length) {
      ec.splitText(eo);
    }

    if (sc.nodeType === 3 && so > 0 && so < sc.length) {
      sc = sc.splitText(so);
      if (startEndSame) {
        eo -= so;
        ec = sc;
      } else if (ec === sc.parentNode && eo >= this._getNodeIndex(sc)) {
        eo++;
      }
      so = 0;
    }
    range.setStart(sc, so); range.setEnd(ec, eo);
  },

  _getTextNodesInRange(document, range) {
    this._splitRangeBoundaries(range);
    if (range.commonAncestorContainer.nodeType === 3) {
      return [range.commonAncestorContainer];
    }
    let walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
      {acceptNode(node) {
        if (range.intersectsNode(node) && node.wholeText.trim() !== '') {
          return NodeFilter.FILTER_ACCEPT;
        }
      }},
      false
    ), node, textNodes = [];

    while (!!(node = walker.nextNode())) { textNodes.push(node); }
    return textNodes;
  },

  _getAncestorWithClass(node, className) {
    while (node) {
      if (node.nodeType === 1 && node.classList.contains(className)) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
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
