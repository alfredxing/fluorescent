'use strict';

module.exports = Annotation;

function Annotation(url, position, host, summary) {
  this.url      = url;
  this.position = position;
  this.host     = host;
  this.summary  = summary;
}
