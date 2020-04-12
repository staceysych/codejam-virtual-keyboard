const Keyboard = {
  elements: {
    mainContainer: null,
    keysContainer: null,
    keyCodesEng: {
      Backquote: '`',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: 'Backspace',
      Tab: 'Tab',
      KeyQ: 'q',
      KeyW: 'w',
      KeyE: 'e',
      KeyR: 'r',
      KeyT: 't',
      KeyY: 'y',
      KeyU: 'u',
      KeyI: 'i',
      KeyO: 'o',
      KeyP: 'p',
      BracketLeft: '[',
      BracketRight: ']',
      Enter: 'Enter',
      CapsLock: 'CapsLock',
      KeyA: 'a',
      KeyS: 's',
      KeyD: 'd',
      KeyF: 'f',
      KeyG: 'g',
      KeyH: 'h',
      KeyJ: 'j',
      KeyK: 'k',
      KeyL: 'l',
      Semicolon: ';',
      Quote: "'",
      Backslash: '\\',
      ShiftLeft: 'ShiftL',
      KeyZ: 'z',
      KeyX: 'x',
      KeyC: 'c',
      KeyV: 'v',
      KeyB: 'b',
      KeyN: 'n',
      KeyM: 'm',
      Comma: ',',
      Period: '.',
      Slash: '/',
      ArrowUp: '▲',
      ShiftRight: 'ShiftR',
      ControlLeft: 'CtrlL',
      MetaLeft: 'Win',
      AltLeft: 'AltL',
      Space: '',
      AltRight: 'AltR',
      ControlRight: 'CtrlR',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
      
    },

    keyCodesRu: {
      Backquote: '`',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: 'Backspace',
      Tab: 'Tab',
      KeyQ: 'й',
      KeyW: 'ц',
      KeyE: 'у',
      KeyR: 'к',
      KeyT: 'е',
      KeyY: 'н',
      KeyU: 'г',
      KeyI: 'ш',
      KeyO: 'щ',
      KeyP: 'з',
      BracketLeft: '[',
      BracketRight: ']',
      Enter: 'Enter',
      CapsLock: 'CapsLock',
      KeyA: 'ф',
      KeyS: 'ы',
      KeyD: 'в',
      KeyF: 'а',
      KeyG: 'п',
      KeyH: 'р',
      KeyJ: 'о',
      KeyK: 'л',
      KeyL: 'д',
      Semicolon: ';',
      Quote: "'",
      Backslash: '\\',
      ShiftLeft: 'ShiftL',
      KeyZ: 'я',
      KeyX: 'ч',
      KeyC: 'с',
      KeyV: 'м',
      KeyB: 'и',
      KeyN: 'т',
      KeyM: 'ь',
      Comma: ',',
      Period: '.',
      Slash: '/',
      ArrowUp: '▲',
      ShiftRight: 'ShiftR',
      ControlLeft: 'CtrlL',
      MetaLeft: 'Win',
      AltLeft: 'AltL',
      Space: '',
      AltRight: 'AltR',
      ControlRight: 'CtrlR',
      ArrowLeft: '◄',
      ArrowDown: '▼',
      ArrowRight: '►',
      
    }
  },

  eventHandler: {
    oninput: null,
  },


  properties: {
    value: '',
    capsLock: false,
    shift: false,
    alt: false,
    langEng: true,
    countToggle: 0,
  },

  //* Save capsLock and lang after page reload.
  checkSessionStorage() {
    let a = sessionStorage.getItem('properties');
    if (a != null) {
      this.properties.capsLock = JSON.parse(a).capsLock;
      this.properties.langEng = JSON.parse(a).langEng;
    }   

  },

  init() {
    // creat elements
    const textarea = document.createElement('textarea');
    const description = document.createElement('div');
    this.elements.mainContainer = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // set main elements
    textarea.classList.add('textarea');
    description.classList.add('description');
    this.elements.mainContainer.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // add to the DOM
    document.body.appendChild(description);
    document.body.appendChild(textarea);
    document.body.appendChild(this.elements.mainContainer);
    this.elements.mainContainer.appendChild(this.elements.keysContainer);

    description.innerHTML = 'Клавиатура создана на Windows <br> Для изменения языка нажмите сочетание клафиш Shift + Alt';
    textarea.placeholder = 'Введите текст..........';

    const area = document.querySelector('.textarea');
    area.addEventListener('focus', () => {
      this.open(area.value, (currentValue) => {
        area.value = currentValue;
      });
    });
  },

  createKeysAndListeners() {
    this.elements.keysContainer.appendChild(this.createKeys());
    this.keyDownAndUp();
  },

  //* when we click on the button -> change classlist
  keyDownAndUp() {
    const keyBoardKeys = document.querySelectorAll('.keyboard__key');

    // when we press a button 
    //* + use destructuring
    document.addEventListener('keydown', ({code}) => {
      this.myFocus();
      //conditional operator short form
      const keyCodes = this.properties.langEng ? this.elements.keyCodesEng : this.elements.keyCodesRu;

      //* if no key in keyCodes, do nothing
      if(Object.prototype.hasOwnProperty.call(keyCodes, code)) {
        keyBoardKeys.forEach((key) => {
          this.open(key.value, (currentValue) => {
            key.value = currentValue;
          });
  
          if (key.innerHTML.toLowerCase() === keyCodes[code].toLowerCase()) {
            key.classList.add('keyboard__key_clicked');
  
            if (key.innerHTML === 'CapsLock') {
              this.toggleCapsLock();
              key.classList.toggle('keyboard__key_active');
            }
  
            if (key.innerHTML === 'AltL' || key.innerHTML === 'AltR') {
              this.properties.alt = true;
              event.preventDefault();
            }
  
            if (key.innerHTML === 'ShiftR' || key.innerHTML === 'ShiftL') {
              this.properties.shift = true;
            }

            if(key.innerHTML === 'Tab') {
              const area = document.querySelector('.textarea');
              event.preventDefault();
              //save position of cursor
              let cursorPositionBeforChange = area.selectionStart;
              //add tab to the cursor position in textarea.value
              area.value = area.value.substring(0,area.selectionStart) + "\t" + area.value.substring(area.selectionEnd);
              //set final position of the cursor by one character to the right
              area.selectionEnd = cursorPositionBeforChange + 1; 
              }
          }
        });
  
        if (this.properties.shift && this.properties.alt) {
          this.changeLang();
        }
      } 

    });
    // when we stop pressing button
    document.addEventListener('keyup', ({code}) => {
      this.myFocus();
      // Conditional operator short form
      const keyCodes = this.properties.langEng ? this.elements.keyCodesEng : this.elements.keyCodesRu;

      //* if no key in keyCodes, do nothing
      if(Object.prototype.hasOwnProperty.call(keyCodes, code)) {
        keyBoardKeys.forEach((key) => {
          if (key.innerHTML.toLowerCase() === keyCodes[code].toLowerCase()) {
            key.classList.remove('keyboard__key_clicked');
          }
  
          if (key.innerHTML === 'AltL' || key.innerHTML === 'AltR') {
            this.properties.alt = false;
          }
  
          if (key.innerHTML === 'ShiftR' || key.innerHTML === 'ShiftL') {
            this.properties.shift = false;
          }
        });
      }

    });
  },


  addClickedStyle(keyButton) {
    keyButton.classList.add('keyboard__key_clicked');
    setTimeout(() => keyButton.classList.remove('keyboard__key_clicked'), 700);
  },

  //* Create buttons
  createKeys() {
    const fragment = document.createDocumentFragment();
    const keys = this.properties.langEng ? this.elements.keyCodesEng : this.elements.keyCodesRu;

    for (let code in keys) {
      let key = keys[code];
      
      const keyButton = document.createElement('button');

      keyButton.setAttribute('type', 'button');
      keyButton.classList.add('keyboard__key');

      keyButton.addEventListener('click', () => {
        this.addClickedStyle(keyButton);
      });

      switch (key) {
        case 'Backspace':
          keyButton.classList.add('keyboard__key_wide');
          keyButton.textContent = key;

          keyButton.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0,
              this.properties.value.length - 1);
            this.triggerEvent();
            this.myFocus();
          });
          break;

        case 'Tab':
          keyButton.classList.add('keyboard__key_wide');
          keyButton.textContent = key;

          keyButton.addEventListener('click', () => {
            this.properties.value += '\t';
            this.triggerEvent();
            this.myFocus();
          });
          break;
        case 'Enter':
          keyButton.classList.add('keyboard__key_wide');
          keyButton.textContent = key;

          keyButton.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent();
            this.myFocus();
          });
          break;

        case 'CapsLock':
          keyButton.classList.add('keyboard__key_wide', 'keyboard__key_activated');
          keyButton.textContent = key;
          if (this.properties.capsLock) {
            keyButton.classList.toggle('keyboard__key_active');
          }

          keyButton.addEventListener('click', () => {
            this.toggleCapsLock();
            keyButton.classList.toggle('keyboard__key_active');
          });
          break;

        case 'CtrlR':
          keyButton.textContent = key;
          break;
        case 'CtrlL':
          keyButton.textContent = key;
          break;

        case 'Win':
          keyButton.textContent = key;
          break;

        case 'ShiftR':
          keyButton.classList.add('keyboard__key_wide');
          keyButton.textContent = key;
          break;
        case 'ShiftL':
          keyButton.classList.add('keyboard__key_wide');
          keyButton.textContent = key;
          break;

        case '':
          keyButton.classList.add('keyboard__key_extra-wide');

          keyButton.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent();
            this.myFocus();
          });
          break;

        case '▲':
          keyButton.textContent = key;
          keyButton.addEventListener('click', () => {
            this.properties.value += '▲';
            this.triggerEvent();
            this.myFocus();
          });

          break;
        case '◄':
          keyButton.textContent = key;
          keyButton.addEventListener('click', () => {
            this.properties.value += '◄';
            this.triggerEvent();
            this.myFocus();
          });
          break;
        case '▼':
          keyButton.textContent = key;
          keyButton.addEventListener('click', () => {
            this.properties.value += '▼';
            this.triggerEvent();
            this.myFocus();
          });
          break;
        case '►':
          keyButton.textContent = key;
          keyButton.addEventListener('click', () => {
            this.properties.value += '►';
            this.triggerEvent();
            this.myFocus();
          });
          break;

        case 'AltL':
          keyButton.textContent = 'AltL';
          break;
        case 'AltR':
          keyButton.textContent = 'AltR';
          break;

        default:
          if (this.properties.capsLock) {
            keyButton.textContent = key.toUpperCase();
          } else {
            keyButton.textContent = key.toLowerCase();
          }

          keyButton.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent();
            this.myFocus();
          });
          break;
      }
      fragment.appendChild(keyButton);

      if (key === 'Backspace' || key === 'Enter' || key === '\\' || key === 'ShiftR') {
        fragment.appendChild(document.createElement('br'));
      }
    }
    return fragment;
  },

  //* Change Case of the keys in the array to Upper or LowerCase;
  toggleCapsLock() {
    const arr = document.querySelectorAll('.keyboard__key');
    this.properties.capsLock = !this.properties.capsLock;
    sessionStorage.setItem('properties', JSON.stringify({capsLock: this.properties.capsLock, langEng: this.properties.langEng}));
    for (let i = 0; i < arr.length; i += 1) {
      if (/^[a-zA-Zа-яА-Я]$/.test(arr[i].textContent)) {
        if (this.properties.capsLock === true) {
          arr[i].textContent = arr[i].textContent.toUpperCase();
        } else {
          arr[i].textContent = arr[i].textContent.toLowerCase();
        }
      }
    }
  },

  changeLang() {
    // postpone funcion due to adding classlist is slow;
    setTimeout(() => {
      this.deleteChild();
      this.properties.langEng = !this.properties.langEng;
      sessionStorage.setItem('properties', JSON.stringify({capsLock: this.properties.capsLock, langEng: this.properties.langEng}));

      this.createKeysAndListeners();
    }, 100);
  },

  deleteChild() {
    const keyboardKeysParent = this.elements.keysContainer;
    while (keyboardKeysParent.firstElementChild) {
      keyboardKeysParent.firstElementChild.innerHTML = '';
      keyboardKeysParent.removeChild(keyboardKeysParent.firstChild);
    }
  },

  //* CREAT A FUNCTION WITH "VALUE" ARGUMENT FOR GETTING KEY.VALUE FORM THE KEYBOARD
  triggerEvent() {
    this.eventHandler.oninput(this.properties.value);
  },

  open(initValue, oninput) {
    this.properties.value = initValue || '';
    this.eventHandler.oninput = oninput;
  },

  myFocus() {
    setTimeout(document.querySelector('.textarea').focus(), 100);
  },


};

window.addEventListener('DOMContentLoaded', () => {
  // upload saved params
  Keyboard.checkSessionStorage();
  // initialize the keybord
  Keyboard.init();
  Keyboard.keyDownAndUp();
  Keyboard.myFocus();
});
