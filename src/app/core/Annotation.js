'use strict';

export default class Annotation {

  constructor(url, position, host, summary) {
    this.url = url;
    this.position = position;
    this.host = host;
    this.summary = summary;
    this.timestamp = Date.now();
  }

}
