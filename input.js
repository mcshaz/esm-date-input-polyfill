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

  setLocaleText(preference) {
	const supportedLocaleList = Object.keys(locales).reduce((accum, l) => {
		accum.push(...l.toLowerCase().split('_'));
		return accum;
	}, []);
	let preferredLocales = preference ? [ preference ] : [];
	preferredLocales.push(...(window.navigator.languages || [ window.navigator.userLanguage || window.navigator.language ]));
	preferredLocales = preferredLocales.map((l) => l.toLowerCase());
	// First, look for an exact match to the provided locale.
	let matchLocale = preferredLocales.find((bl) => supportedLocaleList.includes(bl));
	if (!matchLocale) {
		// If not found, look for a match to only the language.
		preferredLocales = preferredLocales.map((l) => l.substring(0, 2));
		preferredLocales.push('en'); // and en as the final backup
		matchLocale = preferredLocales.find((bl) => supportedLocaleList.includes(bl));
	}
	this.locales = matchLocale;
	this.localeText = locales[matchLocale];
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
