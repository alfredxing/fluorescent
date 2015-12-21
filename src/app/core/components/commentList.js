'use strict';

import riot from 'riot';
import './comment';
import { commentStyles } from './comment';
import { annotationsSelector } from '../selectors/annotationSelectors';
import { positionsSelector } from '../selectors/positionSelectors';
import { showSelector } from '../selectors/uiSelectors';

riot.tag('commentList',
  // template
  `
    <comment each="{annotation in annotations}"
             id="{annotation.id}"
             text="{annotation.comment}"
             riot-style="
               transform: translateY({ positions[annotation.id] }px)
                          translateX({ show ? 0 : 330}px)
             ">
    </comment>
  `,
  // scripts
  function(opts) {
    if (opts.style) {
      opts.style.innerHTML = opts.style.innerHTML + styles;
    }

    this.mixin('redux');
    this.show = true;

    this.subscribe(positionsSelector, positions => {
      this.positions = positions;
      this.update();
    });
    this.subscribe(annotationsSelector, annotations => {
      this.annotations = annotations;
      this.update();
    });
    this.subscribe(showSelector, show => {
      this.show = show;
      this.update();
    });
  }
);

const styles = `
  commentList {
    position: relative;
    padding-right: 330px;
  }
  ${commentStyles}
`;
