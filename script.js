const Keyboard = {
  elements: {
    mainContainer: null,
    keysContainer: null,
    keys: [],
    engKeys: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter', 'ShiftLeft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'Meta', 'AltL', ' ', 'AltR', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ruKeys: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'ShiftLeft', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'Meta', 'AltL', ' ', 'AltR', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
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
    if (sessionStorage.getItem('capsLock') === 'true') {
      this.properties.capsLock = true;
    }
    if (sessionStorage.getItem('langEng') === 'false') {
      this.properties.langEng = false;
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
    // this.createKeysAndListeners();


    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    // console.log(this.elements.keys);

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

    const keyCodesEng = {
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
      ShiftRight: 'ShiftR',
      ControlLeft: 'CtrlL',
      MetaLeft: 'Win',
      AltLeft: 'AltL',
      Space: '',
      AltRight: 'AltR',
      ArrowLeft: '◄',
      ArrowUp: '▲',
      ArrowDown: '▼',
      ArrowRight: '►',
      ControlRight: 'CtrlR',
    };

    const keyCodesRu = {
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
      ShiftRight: 'ShiftR',
      ControlLeft: 'CtrlL',
      MetaLeft: 'Win',
      AltLeft: 'AltL',
      Space: '',
      AltRight: 'AltR',
      ArrowLeft: '◄',
      ArrowUp: '▲',
      ArrowDown: '▼',
      ArrowRight: '►',
      ControlRight: 'CtrlR',
    };

    // when we press a button
    document.addEventListener('keydown', (event) => {
      this.myFocus();
      const keyCode = event.code;
      let keyCodes;

      if (this.properties.langEng) {
        keyCodes = keyCodesEng;
      } else {
        keyCodes = keyCodesRu;
      }

      keyBoardKeys.forEach((key) => {
        this.open(key.value, (currentValue) => {
          key.value = currentValue;
        });

        if (key.innerHTML.toLowerCase() === keyCodes[keyCode].toLowerCase()) {
          key.classList.add('keyboard__key_clicked');
          // console.log('classAdded');

          if (key.innerHTML === 'CapsLock') {
            // console.log('pressed');
            // console.log(key.innerHTML);
            this.toggleCapsLock();
            key.classList.toggle('keyboard__key_active');
          }

          if (key.innerHTML === 'AltL' || key.innerHTML === 'AltR') {
            this.properties.alt = true;
            event.preventDefault();
            // console.log("alt:" + this.properties.alt)
          }

          if (key.innerHTML === 'ShiftR' || key.innerHTML === 'ShiftL') {
            this.properties.shift = true;
            // console.log("shift:" + this.properties.shift)
          }
        }
      });

      if (this.properties.shift && this.properties.alt) {
        this.changeLang();
      }
    });
    // when we stop pressing button
    document.addEventListener('keyup', (event) => {
      this.myFocus();
      const keyCode = event.code;
      let keyCodes;
      if (this.properties.langEng) {
        keyCodes = keyCodesEng;
      } else {
        keyCodes = keyCodesRu;
      }
      keyBoardKeys.forEach((key) => {
        if (key.innerHTML.toLowerCase() === keyCodes[keyCode].toLowerCase()) {
          key.classList.remove('keyboard__key_clicked');
        }

        if (key.innerHTML === 'AltL' || key.innerHTML === 'AltR') {
          this.properties.alt = false;
          // event.preventDefault();
          // console.log("keyUp alt:" + this.properties.alt)
        }

        if (key.innerHTML === 'ShiftR' || key.innerHTML === 'ShiftL') {
          this.properties.shift = false;
          // console.log("key up shift:" + this.properties.shift)
        }
      });
    });
  },


  addClickedStyle(keyButton) {
    keyButton.classList.add('keyboard__key_clicked');
    setTimeout(() => keyButton.classList.remove('keyboard__key_clicked'), 700);
  },

  //* Create buttons
  createKeys() {
    const fragment = document.createDocumentFragment();
    let keys;
    if (this.properties.langEng) {
      keys = this.elements.engKeys;
    } else {
      keys = this.elements.ruKeys;
    }


    keys.forEach((key) => {
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

        case 'ControlRight':
          keyButton.textContent = 'CtrlR';
          break;
        case 'ControlLeft':
          keyButton.textContent = 'CtrlL';
          break;

        case 'Meta':
          keyButton.textContent = 'Win';
          break;

        case 'ShiftRight':
          keyButton.classList.add('keyboard__key_wide');
          keyButton.textContent = 'ShiftR';
          break;
        case 'ShiftLeft':
          keyButton.classList.add('keyboard__key_wide');
          keyButton.textContent = 'ShiftL';
          break;

        case ' ':
          keyButton.classList.add('keyboard__key_extra-wide');

          keyButton.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent();
            this.myFocus();
          });
          break;

        case 'ArrowUp':
          keyButton.textContent = '▲';
          keyButton.addEventListener('click', () => {
            this.properties.value += '▲';
            this.triggerEvent();
            this.myFocus();
          });

          break;
        case 'ArrowLeft':
          keyButton.textContent = '◄';
          keyButton.addEventListener('click', () => {
            this.properties.value += '◄';
            this.triggerEvent();
            this.myFocus();
          });
          break;
        case 'ArrowDown':
          keyButton.textContent = '▼';
          keyButton.addEventListener('click', () => {
            this.properties.value += '▼';
            this.triggerEvent();
            this.myFocus();
          });
          break;
        case 'ArrowRight':
          keyButton.textContent = '►';
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

      if (key === 'Backspace' || key === 'Enter' || key === '\\' || key === 'ShiftRight') {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  //* Change Case of the keys in the array to Upper or LowerCase;
  toggleCapsLock() {
    const arr = document.querySelectorAll('.keyboard__key');
    this.properties.capsLock = !this.properties.capsLock;
    sessionStorage.setItem('capsLock', this.properties.capsLock);
    // console.log("after change:" + this.properties.capsLock)
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
      sessionStorage.setItem('langEng', this.properties.langEng);

      this.createKeysAndListeners();
    }, 100);
  },

  deleteChild() {
    const keyboardKeysParent = this.elements.keysContainer;
    while (keyboardKeysParent.firstElementChild) {
      keyboardKeysParent.firstElementChild.innerHTML = '';
      keyboardKeysParent.removeChild(keyboardKeysParent.firstChild);
      // firstChildOfKeys = keyboardKeysParent.firstElementChild;
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
