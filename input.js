import Picker from './picker.js';
import { getLanguageInfo } from './languages.js';

export default class Input {
  constructor(input) {
    this.element = input;
    this.element.setAttribute('data-has-picker', '');

    let langEl = this.element,
        lang = '';

    while(langEl.parentNode) {
      lang = langEl.getAttribute('lang');

      if(lang) {
        break;
      }

      langEl = langEl.parentNode;
    }

    this.setLocaleText(lang);
    if (!this.element.placeholder) {
      this.element.placeholder = this.localeText.format.replace('M', 'mm').replace('D', 'dd').replace('Y', 'yyyy');
    }

    Object.defineProperties(
      this.element,
      {
        'textValue': {
          get: Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.element), 'value').get
        },
        'value': {
          get: ()=> this.element.polyfillValue,
          set: val=> {
            if(!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
              this.element.polyfillValue = '';
              this.element.setAttribute('value', '');
              return;
            }

            this.element.polyfillValue = val;

            if (val === 'NaN' || val === '') {
              this.element.setAttribute(`value`, '');
            } else {
              const YMD = val.split(`-`);

              this.element.setAttribute(
                `value`,
                this.localeText.format
                  .replace(`Y`, YMD[0])
                  .replace(`M`, YMD[1])
                  .replace(`D`, YMD[2])
              );
            }
          }
        },
        'valueAsDate': {
          get: ()=> {
            if(!this.element.polyfillValue) {
              return null;
            }

            return new Date(this.element.polyfillValue);
          },
          set: val=> {
            if (val === null) {
              this.element.value = '';
            } else if (isNaN(val.getTime())) {
              this.element.value = 'NaN';
            } else {
              this.element.value = val.toISOString().slice(0,10);
            }
          }
        },
        'valueAsNumber': {
          get: ()=> {
            if(!this.element.value) {
              return NaN;
            }

            return this.element.valueAsDate.getTime();
          },
          set: val=> {
            this.element.valueAsDate = new Date(val);
          }
        }
      }
    );

    // Initialize value for display.
    this.element.value = this.element.getAttribute('value');

    // Open the picker when the input get focus,
    // also on various click events to capture it in all corner cases.
    const showPicker = ()=> {
      Picker.instance.attachTo(this);
    };
    this.element.addEventListener('focus', showPicker);
    this.element.addEventListener('mousedown', showPicker);
    this.element.addEventListener('mouseup', showPicker);

    // Update the picker if the date changed manually in the input.
    this.element.addEventListener('keydown', e=> {
      const dt = new Date();
      console.log(this.element);
      console.log(this.element.textValue);
      switch(e.keyCode) {
        case 9:
        case 27:
          Picker.instance.hide();
          break;
        case 38:
          if (this.element.valueAsDate) {
            dt.setDate(this.element.valueAsDate.getDate() + 1);
            this.element.valueAsDate = dt;
            Picker.instance.pingInput();
          }
          break;
        case 40:
          if (this.element.valueAsDate) {
            dt.setDate(this.element.valueAsDate.getDate() - 1);
            this.element.valueAsDate = dt;
            Picker.instance.pingInput();
          }
          break;
        default:
      }
      setTimeout(() => {
        if (this.element.textValue.trim() === '') {
          this.element.valueAsDate = null;
        }
        Picker.instance.sync();
      }, 1)
    });
  }

  setLocaleText(elementLang) {
    let preferredLocales = window.navigator.languages
      ? [...window.navigator.languages]
      : [ window.navigator.userLanguage || window.navigator.language ];
    // user browser preference 1st then element language - arguably should unshift here, or could get complex and 
    // differentiate element language only (length===2) from language and culture both defined on a containing element
    if (elementLang) { preferredLocales.push(elementLang); }

    const li = getLanguageInfo(preferredLocales);
    // First, look for an exact match to the provided locale.
    // for (const pl of preferredLocales) { - with current core-js polyfills this will import Symbol polyfill, which is unnecessary bloat

    this.locale = li.locale;
    this.localeText = li;
  }

  // Will add the Picker to all inputs in the page.
  static addPickerToDateInputs() {
    // Get and loop all the input[type="date"]s in the page that do not have `[data-has-picker]` yet.
    const dateInputs = document.querySelectorAll(`input[type="date"]:not([data-has-picker]):not([readonly])`);
    const length = dateInputs.length;

    if(!length) {
      return false;
    }

    for(let i = 0; i < length; ++i) {
      new Input(dateInputs[i]);
    }
  }
}
