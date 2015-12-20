'use strict';

import uuid from 'uuid';

export default class Annotation {

  constructor(url, position, host, summary, comment = '') {
    this.id = uuid.v4();
    this.url = url;
    this.position = position;
    this.host = host;
    this.summary = summary;
    this.comment = comment;
    this.timestamp = Date.now();
  }

}
