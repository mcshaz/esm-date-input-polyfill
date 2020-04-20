import { isDateInputSupported } from './date-input-is-supported';
const pickerAppliedAttr = 'data-has-picker';
const forcePickerAttr = 'data-force-date-input-polyfill';

class FindInputsHelper {
    constructor(readonly forcePolyfill = false) {
    }

    requiresPolyfilling(el: Element | null) {
        return el !== null && el.tagName === 'INPUT' && el.getAttribute('type') === 'date' && !el.hasAttribute(pickerAppliedAttr)
          && (!isDateInputSupported || (this.forcePolyfill && el.closest(`[${forcePickerAttr}]`) !== null));
    }

    getAllInputsForPolyfilling() {
        // keeping logic in 1 place for now - see commented out code below for alternative
        return Array.from(document.getElementsByTagName('input')).filter((el) => this.requiresPolyfilling(el)) 
          || [];
        /*
      if (supported) {
        document.querySelectorAll(`input[type="date"][${forcePicker}]:not([${pickerApplied}]), [${forcePicker}] input[type="date"]:not([${pickerApplied}])`);
      } else {
        return document.querySelectorAll(`input[type="date"]:not([${pickerApplied}])`);
      }
      */
    }
}

export { pickerAppliedAttr, forcePickerAttr, FindInputsHelper };
