import Picker from './picker.js';
import locales from './locales.js';

export default class Input {
  constructor(input) {
    this.element = input;
    this.element.setAttribute(`data-has-picker`, ``);

    let langEl = this.element,
        lang = ``;

    while(langEl.parentNode) {
      lang = langEl.getAttribute(`lang`);

      if(lang) {
        break;
      }

      langEl = langEl.parentNode;
    }

	this.setLocaleText(lang);

    Object.defineProperties(
      this.element,
      {
        'value': {
          get: ()=> this.element.polyfillValue,
          set: val=> {
            if(!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
              this.element.polyfillValue = ``;
              this.element.setAttribute(`value`, ``);
              return false;
            }

            this.element.polyfillValue = val;

            const YMD = val.split(`-`);

            this.element.setAttribute(
              `value`,
              this.localeText.format
                .replace(`Y`, YMD[0])
                .replace(`M`, YMD[1])
                .replace(`D`, YMD[2])
            );
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
            this.element.value = val.toISOString().slice(0,10);
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
    this.element.value = this.element.getAttribute(`value`);

    // Open the picker when the input get focus,
    // also on various click events to capture it in all corner cases.
    const showPicker = ()=> {
      Picker.instance.attachTo(this);
    };
    this.element.addEventListener(`focus`, showPicker);
    this.element.addEventListener(`mousedown`, showPicker);
    this.element.addEventListener(`mouseup`, showPicker);

    // Update the picker if the date changed manually in the input.
    this.element.addEventListener(`keydown`, e=> {
      const date = new Date();

      switch(e.keyCode) {
        case 27:
          Picker.instance.hide();
          break;
        case 38:
          if(this.element.valueAsDate) {
            date.setDate(this.element.valueAsDate.getDate() + 1);
            this.element.valueAsDate = date;
            Picker.instance.pingInput();
          }
          break;
        case 40:
          if(this.element.valueAsDate) {
            date.setDate(this.element.valueAsDate.getDate() - 1);
            this.element.valueAsDate = date;
            Picker.instance.pingInput();
          }
          break;
        default:
          break;
      }

      Picker.instance.sync();
    });
  }

  setLocaleText(elementLang) {
    const supportedLocales = {}; // could use an ES map, but that would add a polyfill with extraneous features
    Object.keys(locales).forEach((ls) => {
      ls.toLowerCase().split('_').forEach((l) => supportedLocales[l] = locales[ls]);
    });
    let preferredLocales = window.navigator.languages || [ window.navigator.userLanguage || window.navigator.language ];
    // user browser preference 1st then element language - arguably should unshift here, or could get complex and 
    // differentiate element language only (length===2) from language and culture both defined on a containing element
    preferredLocales.push(elementLang); 

    preferredLocales = preferredLocales.map((l) => l.toLowerCase());
    // First, look for an exact match to the provided locale.
    // for (const pl of preferredLocales) { - with current core-js polyfills this will import Symbol polyfill, which is unnecessary bloat
    for (let i = 0; i < preferredLocales.length; ++i) {
      const pl = preferredLocales[i];
      if (supportedLocales[pl]) {
        this.locale = pl;
        this.localeText = supportedLocales[pl];
        return;
      }
    }
    preferredLocales.push('en');
    // If not found, look for a match to only the language.
    for (let i = 0; i < preferredLocales.length; ++i) {
      const lang = preferredLocales[i].substring(0,2);
      if (supportedLocales[lang]) {
        this.locale = lang;
        this.localeText = supportedLocales[lang];
        return;
      }
    }
  }

  // Return false if the browser does not support input[type="date"].
  static supportsDateInput() {
    const input = document.createElement(`input`);
    input.setAttribute(`type`, `date`);

    const notADateValue = `not-a-date`;
    input.setAttribute(`value`, notADateValue);

    return (
      (
        document.currentScript
        && !document.currentScript.hasAttribute(`data-nodep-date-input-polyfill-debug`)
      )
      && !(input.value === notADateValue)
    );
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
