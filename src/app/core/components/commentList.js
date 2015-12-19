'use strict';

import riot from 'riot';
import './comment';

riot.tag('commentList',
  // template
  `
  `,
  // scripts
  function(opts) {
    if (opts.style) {
      opts.style.innerHTML = opts.style.innerHTML + styles;
    }

  }
);
