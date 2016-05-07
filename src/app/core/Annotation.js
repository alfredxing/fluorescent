'use strict';

import uuid from 'uuid';

export default class Annotation {

  constructor(url, position, host, summary, comment = '', color = '#00DC3F') {
    this.id = uuid.v4();
    this.url = url;
    this.position = position;
    this.host = host;
    this.summary = summary;
    this.comment = comment;
    this.color = color;
    this.timestamp = Date.now();
  }

}
