import riot from 'riot';

riot.tag('comment',
  // template
  `
    <div class="{'content': true, 'hide': this.mode != 0}">
      <div class="{'note-text': true}" name="noteText"></div>
      <div class="{'datetime': true}" name="dateTime"></div>
    </div>

    <textarea class="{'edit-text-area': true, 'hide': this.mode != 1}"
              name="editTextArea"
              maxlength="300">
    </textarea>

    <div class="{'toolbar': true, 'hide': this.mode != 0}">
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

    <div class="{'toolbar': true, 'hide': this.mode != 1}">
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
  `,
  // script
  function(opts) {
    if (opts.style) {
      opts.style.innerHTML = opts.style.innerHTML + styles;
    }

    const DEFAULT_MODE = 0,
          EDIT_MODE = 1,
          FORMAT_MODE = 2;

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
      this.noteText.innerHTML = this.editTextArea.value;
    };

    this.editTextArea.addEventListener('keyup', resizeTextArea);
    this.edit.addEventListener('click', editHandler);
    this.editCancel.addEventListener('click', editCancelHandler);
    this.editSave.addEventListener('click', editSaveHandler);
  }
);

const styles = `
  comment {
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
  comment > * {
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
    border-radius: 0;
    outline: none;
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
  .icon-btn {
    border: 0;
    margin: 0;
    background: none;
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
`;
