'use strict';

import popover from './templates/popover';

export default class Comment {

  constructor(window, shadowRoot, id, content, yOffset) {
    this.document = window.document;
    this.shadowRoot = shadowRoot;
    this.id = id;
    this.content = content;
    this.yOffset = yOffset;

    this._initElement();
  }

  _initElement() {
    let container = this.document.createElement('div');
    container.classList.add('fl-comment-' + this.id);
    container.classList.add('container');
    container.innerHTML = popover.template;
    container.style.position = 'absolute';
    container.style.right = '10px';
    container.style.top = this.yOffset + 'px';

    let toolbarDefault = container.querySelector('.toolbar-default'),
        toolbarEdit    = container.querySelector('.toolbar-edit'),
        content        = container.querySelector('.content'),
        editTextArea   = container.querySelector('.edit-text-area');

    let btnChangeColor = toolbarDefault.querySelector('.change-color'),
        btnReselect    = toolbarDefault.querySelector('.reselect'),
        btnDelete      = toolbarDefault.querySelector('.delete'),
        btnEdit        = toolbarDefault.querySelector('.edit');

    let btnTextBold    = toolbarEdit.querySelector('.text-bold'),
        btnTextItalic  = toolbarEdit.querySelector('.text-italic'),
        btnTextUl      = toolbarEdit.querySelector('.text-underline'),
        btnEditCancel  = toolbarEdit.querySelector('.edit-cancel'),
        btnEditSave    = toolbarEdit.querySelector('.edit-save');

    function toggleHide(el) {
      el.classList.toggle('hide');
    }

    function resizeTextArea(el) {
      el.style.height = "auto";
      el.style.height = "1px";
      el.style.height = (21 + el.scrollHeight) + 'px';
    }

    btnEdit.addEventListener('click', function() {
      [toolbarDefault, toolbarEdit, content, editTextArea].forEach(toggleHide);
      editTextArea.focus();
      editTextArea.value = '';
      editTextArea.value = content.querySelector('.note-text').innerHTML;
      resizeTextArea(editTextArea);
    });

    editTextArea.addEventListener('keyup', resizeTextArea.bind(null, editTextArea));

    btnEditCancel.addEventListener('click', function() {
      [toolbarDefault, toolbarEdit, content, editTextArea].forEach(toggleHide);
    });

    btnEditSave.addEventListener('click', function() {
      [toolbarDefault, toolbarEdit, content, editTextArea].forEach(toggleHide);
      content.querySelector('.note-text').innerHTML = editTextArea.value;
    });

    this.shadowRoot.appendChild(container);
  }

}
