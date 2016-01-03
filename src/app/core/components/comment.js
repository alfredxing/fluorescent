'use strict';

import riot from 'riot';
import { editAndNotify, deleteAndNotify } from '../actions/annotations';
import { setHovered, setFocused, setReselect } from '../actions/ui';

riot.tag('comment',
  // template
  `
    <div class="{'comment-container': true}">
      <div class="{'content': true, 'hide': mode == 1}">
        <div class="{'note-text': true}" name="noteText">{opts.text}</div>
        <div class="{'datetime': true}" name="dateTime"></div>
      </div>

      <textarea class="{'edit-text-area': true, 'hide': mode != 1}"
                name="editTextArea"
                maxlength="300">
      </textarea>

      <div class="{'toolbar': true, 'hide': mode != 0}">
        <button class="{'icon-btn': true}" name="changeColor">
          <i class="{'material-icons' : true}">format_color_fill</i>
        </button>
        <button class="{'icon-btn': true}" name="reselect">
          <i class="{'material-icons': true}">text_format</i>
        </button>
        <button class="{'icon-btn': true}" name="delete">
          <i class="{ 'material-icons': true }">delete</i>
        </button>
        <button class="{'icon-btn': true, 'edit': true}" name="edit">
          Edit
        </button>
      </div>

      <div class="{'toolbar': true, 'hide': mode != 1}">
        <button class="{'icon-btn': true}" name="textBold">
          <i class="{'material-icons': true}">format_bold</i>
        </button>
        <button class="{'icon-btn': true}" name="textItalic">
          <i class="{'material-icons': true}">format_italic</i>
        </button>
        <button class="{'icon-btn': true}" name="textUnderline">
          <i class="{'material-icons': true}">format_underline</i>
        </button>
        <button class="{'icon-btn': true, 'edit-save': true}" name="editSave">
          Save
        </button>
        <button class="{'icon-btn': true, 'edit-cancel': true}" name="editCancel">
          Cancel
        </button>
      </div>

      <div class="{'toolbar': true, 'hide': mode != 2}">
        <button class="{'icon-btn': true}" name="changeColorCancel">
          <i class="{'material-icons': true}">close</i>
        </button>
        <button class="{'icon-btn': true}" name="colorGreen">
          <div class="{'color-circle': true, 'color-green': true}"></div>
        </button>
        <button class="{'icon-btn': true}" name="colorYellow">
          <div class="{'color-circle': true, 'color-yellow': true}"></div>
        </button>
        <button class="{'icon-btn': true}" name="colorBlue">
          <div class="{'color-circle': true, 'color-blue': true}"></div>
        </button>
      </div>

    </div>
  `,
  // script
  function(opts) {
    const DEFAULT_MODE = 0,
          EDIT_MODE = 1,
          COLOR_MODE = 2;

    this.mode = DEFAULT_MODE;

    const setMode = mode => {
      this.mode = mode;
      this.update();
    };

    const resizeTextArea = () => {
      let e = this.editTextArea;

      e.style.height = 'auto';
      e.style.height = '1px';
      e.style.height = (21 + e.scrollHeight) + 'px';
    };

    this.id = opts.id;

    this.mixin('redux');
    this.dispatchify({
      editAndNotify, deleteAndNotify, setHovered, setFocused, setReselect
    });

    const changeColorHandler = () => {
      setMode(COLOR_MODE);
    };

    const reselectHandler = () => {
      this.setReselect(this.id);
    }

    const editHandler = () => {
      setMode(EDIT_MODE);

      let e = this.editTextArea;

      e.focus();
      e.value = '';
      e.value = this.noteText.innerHTML;
      resizeTextArea();
    };

    const editCancelHandler = () => {
      setMode(DEFAULT_MODE);
    };

    const editSaveHandler = () => {
      setMode(DEFAULT_MODE);
      let newText = this.editTextArea.value;

      this.noteText.innerHTML = newText;
      this.editAndNotify(this.id, { comment: newText });
    };

    const deleteHandler = () => {
      this.deleteAndNotify(this.id);
    };

    const clickHandler = e => {
      e.stopImmediatePropagation();
      this.setFocused(this.id);
    };

    const hoverHandler = () => {
      this.setHovered(this.id);
    };

    const unhoverHandler = () => {
      this.setHovered(null);
    };

    this.editTextArea.addEventListener('keyup', resizeTextArea);
    this.edit.addEventListener('click', editHandler);
    this.editCancel.addEventListener('click', editCancelHandler);
    this.editSave.addEventListener('click', editSaveHandler);

    this.reselect.addEventListener('click', reselectHandler);

    this.changeColor.addEventListener('click', changeColorHandler);
    this.changeColorCancel.addEventListener('click', editCancelHandler);

    this.delete.addEventListener('click', deleteHandler);

    this.root.addEventListener('click', clickHandler);
    this.root.addEventListener('mouseenter', hoverHandler);
    this.root.addEventListener('mouseleave', unhoverHandler);
  }
);

export const commentStyles = `
  comment {
    all: unset;
    display: block;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5em;
    background: #fff;
    border-top: 3px solid rgba(47,226,103,0.4);
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    width: 280px;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: auto;
    padding-bottom: 0;
    opacity: 1;
    transform-origin: 100% 50%;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                padding 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  comment.focused {
    padding-bottom: 31px;
  }
  comment.hidden {
    opacity: 0;
    pointer-events: none;
  }
  comment.focused .toolbar {
    opacity: 1;
    transform: translateY(31px);
    pointer-events: auto;
  }
  comment.focused .toolbar.hide {
    opacity: 0;
    display: block;
    pointer-events: none;
  }
  comment.focused .edit-text-area {
    display: block;
  }
  comment.focused .hide {
    display: none;
  }
  comment > *,
  .comment-container > * {
    box-sizing: inherit;
  }
  .comment-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  button {
    font-family: inherit;
  }
  .content {
    padding: 14px 18px;
    word-wrap: break-word;
  }
  .datetime {
    font-size: 12px;
    color: rgba(26,60,91,0.6);
  }
  .edit-text-area {
    margin: 7px 9px;
    padding: 6px 8px;
    overflow: hidden;
    border: 1px solid #d9d9d9;
    background: #f5f6f7;
    border-radius: 0;
    outline: none;
    resize: none;
    width: 262px;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    display: none;
  }
  .edit-text-area:focus {
    outline: none;
  }
  .toolbar {
    border-top: 1px solid rgba(0,0,0,0.08);
    height: 31px;
    box-sizing: inherit;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    pointer-events: none;
    transform: translateY(0px);
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .toolbar > * {
    height: 31px;
    box-sizing: inherit;
    padding: 6px;
    display: inline-block;
    line-height: 1em;
    cursor: pointer;
    font-size: 12px;
    color: rgba(26,60,91,0.45);
  }
  .icon-btn {
    border: 0;
    margin: 0;
    background: none;
  }
  .icon-btn:first-child {
    margin-left: 8px;
  }
  .color-circle {
    border-radius: 9999px;
    width: 17px;
    height: 17px;
  }
  .color-green {
    background: rgba(0,220,63,0.5);
  }
  .color-yellow {
    background: rgba(242,197,10,0.5);
  }
  .color-blue {
    background: rgba(7,198,240,0.5);
  }
  .edit, .edit-save, .edit-cancel {
    float: right;
    font-weight: bold;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 7px;
    line-height: 1.5em;
  }
  .edit-save {
    background-color: rgba(35,163,8,1);
    color: rgba(255,255,255,1);
  }
  .edit-cancel {
    background-color: rgba(0,0,0,0.05);
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 19px;  /* Preferred icon size */
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1.1em;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }
`;
