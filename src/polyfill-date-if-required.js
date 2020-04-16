import { dateInputIsSupported } from './date-input-is-supported.js';
import { forcePickerAttr } from './find-inputs-helper.js'

// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
export function polyfillDateIfRequired({ watchForInsert = false, allowForcePicker = false, yrsBack = 80, yrsFwd = 20 } = {}) {
  if (dateInputIsSupported && !(allowForcePicker && document.querySelector(`[${forcePickerAttr}]`))) {
    return Promise.resolve();
  } else {
    return import('./add-pickers.js').then((module) => {
      return new Promise((resolve, _reject) => {
        let pickerAdded = false;
        const loaded = () => {
          if (!pickerAdded) {
            module.addPickers({ watchForInsert, allowForcePicker, yrsBack, yrsFwd });
            resolve();
            pickerAdded = true;
          }
        }
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