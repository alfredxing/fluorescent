'use strict';

export default {
  style: `
    <style>
      .container {
        all: unset;
        display: block;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        line-height: 1.5em;
        background: #fff;
        border-top: 3px solid rgba(47,226,103,0.4);
        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        width: 320px;
      }
      .container > * {
        box-sizing: inherit;
      }
      .hide { display: none; }

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
        resize: none;
        width: 302px;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
      }

      .edit-text-area:focus {
        outline: none;
      }

      .toolbar {
        border-top: 1px solid rgba(0,0,0,0.08);
        height: 40px;
        box-sizing: inherit;
      }
      .toolbar > * {
        height: 40px;
        box-sizing: inherit;
        padding: 8px 10px;
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        color: rgba(26,60,91,0.45);
      }
      .icon-btn:first-child {
        margin-left: 8px;
      }
      .edit, .edit-save, .edit-cancel {
        float: right;
        font-weight: bold;
        padding-left: 14px;
        padding-right: 14px;
      }

      .edit-save {
        background-color: rgba(35,163,8,1);
        color: rgba(255,255,255,1);
      }
      .edit-cancel {
        background-color: rgba(0,0,0,0.05);
      }
    </style>
  `,
  template: `
    <div class="content">
      <div class="note-text"></div>
      <div class="datetime"></div>
    </div>
    <textarea maxlength="300" class="edit-text-area hide"></textarea>
    <div class="toolbar toolbar-default">
      <div class="icon-btn change-color">
        <i class="material-icons">format_color_fill</i>
      </div>
      <div class="icon-btn reselect">
        <i class="material-icons">text_format</i>
      </div>
      <div class="icon-btn delete">
        <i class="material-icons">delete</i>
      </div>
      <div class="edit">Edit</div>
    </div>
    <div class="toolbar toolbar-edit hide">
      <div class="icon-btn text-bold">
        <i class="material-icons">format_bold</i>
      </div>
      <div class="icon-btn text-italic">
        <i class="material-icons">format_italic</i>
      </div>
      <div class="icon-btn text-underline">
        <i class="material-icons">format_underline</i>
      </div>
      <div class="edit-save">Save</div>
      <div class="edit-cancel">Cancel</div>
    </div>
  `
}
