import { dateInputIsSupported } from './dateInputIsSupported.js';
const pickerAppliedAttr = 'data-has-picker';
const forcePickerAttr = 'data-nodep-date-input-polyfill-debug';

class FindInputsHelper {
  constructor({ allowForcePicker = false} = {}) {
    this.allowForcePicker = allowForcePicker;
  }

  requiresPolyfilling(el) {
      return el && el.tagName === 'INPUT' && el.getAttribute('type') === 'date' && !el.hasAttribute(pickerAppliedAttr)
          && (!dateInputIsSupported || (this.allowForcePicker && el.closest(`[${forcePickerAttr}]`) !== null));
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

export { pickerAppliedAttr, forcePickerAttr, FindInputsHelper }
