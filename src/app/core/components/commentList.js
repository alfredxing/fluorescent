'use strict';

import riot from 'riot';
import './comment';
import { commentStyles } from './comment';
import { unsetAll } from '../actions/ui';
import { annotationsSelector } from '../selectors/annotationSelectors';
import { positionsSelector } from '../selectors/positionSelectors';
import {
  showSelector,
  hoveredSelector,
  focusedSelector
} from '../selectors/uiSelectors';

riot.tag('commentList',
  // template
  `
    <div class="{'comment-list-container': true}">
      <comment each="{annotation in annotations}"
               id="{annotation.id}"
               text="{annotation.comment}"
               class="{
                 hovered: annotation.id === hoveredId,
                 focused: annotation.id === focusedId,
                 hidden:  !show
               }"
               riot-style="
                 transform: translateY({positions[annotation.id]}px)
                            translateX({(annotation.id === focusedId ||
                                         annotation.id === hoveredId) ?
                                         -15 : 0}px)
                            scale({show ? 1 : 0.8});
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
    this.dispatchify({ unsetAll });

    this.show = true;

    const subscribe = (selector, field) => {
      this.subscribe(selector, state => {
        this[field] = state;
        this.update();
      });
    };

    subscribe(positionsSelector, 'positions');
    subscribe(annotationsSelector, 'annotations');
    subscribe(showSelector, 'show');
    subscribe(hoveredSelector, 'hoveredId');
    subscribe(focusedSelector, 'focusedId');

    document.addEventListener('click', () => {
      this.unsetAll();
    });
  }
);

const styles = `
  commentList {
    position: relative;
    margin-left: 30px;
    display: block;
  }
  ${commentStyles}
`;
