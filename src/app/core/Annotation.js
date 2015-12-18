'use strict';

export default class Annotation {

  constructor(url, position, host, summary, comment = '') {
    this.url = url;
    this.position = position;
    this.host = host;
    this.summary = summary;
    this.comment = comment;
    this.timestamp = Date.now();
  }

}
