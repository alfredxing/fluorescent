'use strict';

export default {

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

  getSelectedRange(document) {
    let selection = document.getSelection(),
        range     = selection.getRangeAt(0);

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
        while (i--) {
          nodeStack.push(childNodes[i]);
        }
      }
    }

    return range;
  },

  applyClassToRange(document, range, className) {
    let textNodes = this.getTextNodesInRange(document, range);
    return textNodes.map(textNode =>
      this.applyClassToTextNode(document, textNode, className)
    );
  },

  getNodeIndex(node) {
    var i = 0; while (node = node.previousSibling) { ++i; }
    return i;
  },

  splitRangeBoundaries(range) {
    let sc = range.startContainer, so = range.startOffset,
        ec = range.endContainer, eo = range.endOffset;
    let startEndSame = (sc === ec);

    if (ec.nodeType === 3 && eo > 0 && eo < ec.length) {
      ec.splitText(eo);
    }

    if (sc.nodeType === 3 && so > 0 && so < sc.length) {
      sc = sc.splitText(so);
      if (startEndSame) {
        eo -= so;
        ec = sc;
      } else if (ec == sc.parentNode && eo >= this.getNodeIndex(sc)) {
        eo++;
      }
      so = 0;
    }
    range.setStart(sc, so); range.setEnd(ec, eo);
  },

  getTextNodesInRange(document, range) {
    this.splitRangeBoundaries(range);
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

    while (node = walker.nextNode()) { textNodes.push(node); }
    return textNodes;
  },

  applyClassToTextNode(document, textNode, className) {
    let parent = textNode.parentNode;

    if (parent.childNodes.length === 1) {
      parent.classList.add(className);
      parent.style.backgroundColor = 'rgba(0,220,63,0.4)';
      return parent;
    } else {
      let span = document.createElement('span');
      span.classList.add(className);
      span.style.backgroundColor = 'rgba(0,220,63,0.4)';
      parent.insertBefore(span, textNode);
      span.appendChild(textNode);
      return span;
    }
  },

  getClassApplier(className) {
    rangy.init();
    return rangy.createClassApplier(className, {
      // TODO: remove hardcoded style;
      // let AnnotationApplier handle styling
      elementAttributes: { style: 'background-color: rgba(0,220,63,0.4)'}
    });
  },

  getClassApplierElements(classApplier, range) {
    return classApplier.getElementsWithClassIntersectingRange(range);
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
