import Picker from './picker.js';
import { getLanguageInfo } from './languages.js';
import { pickerAppliedAttr } from './find-inputs-helper.js';
import { dateInputIsSupported } from './date-input-is-supported.js';
import { LookupResult } from './lookup-result.js';
import {closestWithProp} from './closest-with-prop.js';

const validIsoDateRx = /^\d{4}-\d{2}-\d{2}$/;

export default class Input {
  constructor(input) {
    this.element = input;
    this.element.setAttribute(pickerAppliedAttr, '');
    this.element.setAttribute('autocomplete', 'off'); // otherwise autocomplete suggestion hides date picker
    if (dateInputIsSupported) {
      // this wil both prevent the native datepicker displaying AND allow asigning a value attribute which is not ISO8601 compliant
      this.element.type = 'date-polyfill';
      // this.element.addEventListener('click', preventDefault);
    }

    this.setLocaleText(closestWithProp(this.element, 'lang'));
    if (!this.element.placeholder) {
      this.element.placeholder = this.localeText.format.replace('M', 'mm').replace('D', 'dd').replace('Y', 'yyyy');
    }
    this.element.pattern = this.localeText.parser.pattern;
    const valuePropDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.element), 'value')
    if (valuePropDescriptor === null) {
      valuePropDescriptor = { get:() => this.element.getAttribute('value') || '', set:(value) => this.element.setAttribute('value', value) };
      console.log("esm-date-input-polyfill: unable to obtain native input[type=date] .value propertyDescriptor");
    }
    Object.defineProperties(
      this.element,
      {
        'textValue': {
          get: valuePropDescriptor.get,
          set: valuePropDescriptor.set
        },
        'value': {
          get: ()=> this.element._datePolyfillVal
            ? new Date(this.element._datePolyfillVal).toISOString().slice(0,10)
            : '',
          set: val=> this.element.valueAsDate = (val && validIsoDateRx.test(val))
            ? new Date(val)
            : null,
        },
        'valueAsDate': {
          get:() => this.element._datePolyfillVal
              ? new Date(this.element._datePolyfillVal)
              : null,
          set:(val) => {
            if (val && val.getTime && !Number.isNaN(this.element._datePolyfillVal = val.getTime())) {
              this.element.textValue = this.toLocaleDateString(val);
            } else {
              this.element.textValue  = '';
              this.element._datePolyfillVal = void 0;
            }
            this.validate();
          }
        },
        'valueAsNumber': {
          get: ()=> this.element._datePolyfillVal === void 0
            ? NaN
            : this.element._datePolyfillVal,
          set: val=> this.element.valueAsDate = new Date(val),
        },
        'min': {
          get: ()=> this.element.getAttribute('min'),
          set: val=> validIsoDateRx.test(val)
            ? this.element.setAttribute('min', val)
            : this.element.removeAttribute('min'),
        },
        'max': {
          get: ()=> this.element.getAttribute('max'),
          set: val=> validIsoDateRx.test(val)
            ? this.element.setAttribute('max', val)
            : this.element.removeAttribute('max'),
        }
      }
    );

    // Initialize value for display.
    if (!this.element.setCustomValidity) {
      console.log('HTMLElement.setCustomValidity not supported');
      this.element.setCustomValidity = () => void 0;
    }
    this.element.value = this.element.getAttribute('value');


    // Open the picker when the input get focus,
    // also on various click events to capture it in all corner cases.
    const showPicker = ()=> Picker.instance.attachTo(this);
    const passiveOpt = { passive: true };
    this.element.addEventListener('focus', showPicker, passiveOpt);
    this.element.addEventListener('mousedown', showPicker, passiveOpt);
    this.element.addEventListener('mouseup', showPicker, passiveOpt);

    // Update the picker if the date changed manually in the input.
    this.element.addEventListener('keydown', e=> {
      let beginValue = this.element.valueAsDate;
      let requirePing = true;
      let requireParse = false;
      switch(e.keyCode) {
        case 9:
        case 13:
        case 27:
          Picker.instance.hide();
          requirePing = false;
          break;
        case 38:
          if (beginValue === null) { beginValue = new Date(); }
          beginValue.setDate(beginValue.getDate() + 1);
          this.element.valueAsDate = beginValue;
          break;
        case 40:
          if (beginValue === null) { beginValue = new Date(); }
          beginValue.setDate(beginValue.getDate() - 1);
          this.element.valueAsDate = beginValue;
          break;
        default:
          requireParse = true;
      }
      if (requirePing) {
        if (requireParse) {
          const self = this;
          setTimeout(() => {
            const parseDt = self.localeText.parser.parse(self.element.textValue);
            if (parseDt) {
              parseDt.setTime(parseDt.getTime() - parseDt.getTimezoneOffset() * 60000);
            }
            if (+parseDt !== +self.element.valueAsDate) {
              self.element.valueAsDate = parseDt;
              Picker.instance.pingInput();
              Picker.instance.sync();
            }
          }, 1);
        } else {
          Picker.instance.pingInput();
          Picker.instance.sync();
        }
      }
    }, passiveOpt);
  }

  validate() {
    if (this.element._datePolyfillVal) {
      let minDate = new Date(this.element.min || NaN);
      let maxDate = new Date(this.element.max || NaN);
      if (this.element._datePolyfillVal < minDate.getTime()) {
        this.element.setCustomValidity('≥ ' + this.toLocaleDateString(minDate));
        return false;
      } else if (this.element._datePolyfillVal > maxDate.getTime()) {
        this.element.setCustomValidity('≤ ' + this.toLocaleDateString(maxDate));
        return false;
      }
    }
    this.element.setCustomValidity('');
    return true;
  }

  setLocaleText(elementLang) {
    let preferredLocales = (window.navigator.languages
      ? window.navigator.languages
      : [ window.navigator.userLanguage || window.navigator.language ]).map((l) => l.toLowerCase());
    
    if (elementLang) {
      // trying to emmulate what a native browser might/should do - 1 thing for certain is if the language is not installed on the browser it will not be used
      elementLang = elementLang.match(/^[a-z]+/)[0].toLowerCase();
      const matchesElLang = new LookupResult((l) => l.startsWith(elementLang));
      preferredLocales.forEach((l) => matchesElLang.add(l));
      preferredLocales = matchesElLang.get(true).concat(matchesElLang.get(false));
    }

    const li = getLanguageInfo(preferredLocales);

    this.locale = li.locale;
    this.localeText = li;
  }

  toLocaleDateString(dt) {
    const ymd = dt.toISOString().slice(0,10).split(`-`);
    return this.localeText.format
      .replace(`Y`, ymd[0])
      .replace(`M`, ymd[1])
      .replace(`D`, ymd[2]);
  }
}
