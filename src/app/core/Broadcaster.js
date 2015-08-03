'use strict';

import Signal from 'signals';

export default class Broadcaster {

  constructor() {
  }

  _startSignals(...signals) {
    signals.forEach(signalName => this[signalName] = new Signal());
  }

}
