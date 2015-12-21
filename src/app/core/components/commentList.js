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
    <div class="{'comment-list-container': true}">
      <comment each="{annotation in annotations}"
               id="{annotation.id}"
               text="{annotation.comment}"
               riot-style="
                 opacity: { show ? 1 : 0 };
                 transform: translateY({positions[annotation.id]}px)
                            scale({show ? 1 : 0.75})
                            rotateY({show ? 0 : -10}deg);
               ">
      </comment>
    </div>
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
    margin-left: 10px;
    display: block;
  }
  .comment-list-container {
    perspective: 1600px;
  }
  ${commentStyles}
`;
