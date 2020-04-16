import { dateInputIsSupported } from './date-input-is-supported.js';
import { forcePickerAttr } from './find-inputs-helper.js';

// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
export function polyfillIfRequired({ watchForInsert = false, forcePolyfill = false, yrsBack = 80, yrsFwd = 20 } = {}) {
    if (dateInputIsSupported && !(forcePolyfill && document.querySelector(`[${forcePickerAttr}]`))) {
        return Promise.resolve(false);
    } else {
        return import('./add-pickers.js').then((module) => {
            return new Promise((resolve /*, _reject */) => {
                let pickerAdded = false;
                const loaded = () => {
                    if (!pickerAdded) {
                        module.addPickers({ watchForInsert, forcePolyfill, yrsBack, yrsFwd });
                        pickerAdded = true;
                        resolve(true);
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