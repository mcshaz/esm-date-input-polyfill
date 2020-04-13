const dateInputIsSupported = doesSupportDateInput();

function doesSupportDateInput() {
  const input = document.createElement('input');
  input.setAttribute('type', 'date');

  const notADateValue = 'not-a-date';
  input.setAttribute('value', notADateValue);
  return input.value !== notADateValue;
}

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

// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
function polyfillDateIfRequired({ watchForInsert = false, allowForcePicker = false } = {}) {
  if (dateInputIsSupported && !(allowForcePicker && document.querySelector(`[${forcePickerAttr}]`))) {
    return Promise.resolve();
  } else {
    import('./addPickers-08ced8bc.mjs').then((module) => {
      return new Promise((resolve, _reject) => {
        let pickerAdded = false;
        const loaded = () => {
          if (!pickerAdded) {
            module.addPickers({ watchForInsert, allowForcePicker });
            resolve();
            pickerAdded = true;
          }
        };
        if (document.readyState === 'complete') {
          loaded();
        } else {
          document.addEventListener('DOMContentLoaded', loaded);
          window.addEventListener('load', loaded);
        }
      });
    });
  }
}

export { FindInputsHelper as F, pickerAppliedAttr as a, dateInputIsSupported as d, polyfillDateIfRequired as p };
//# sourceMappingURL=polyfill-date-if-required-dynamic-import-3d89b165.mjs.map
