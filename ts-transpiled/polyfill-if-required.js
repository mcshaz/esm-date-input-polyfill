import { isDateInputSupported } from './date-input-is-supported';
import { forcePickerAttr } from './find-inputs-helper';
// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
export function polyfillIfRequired({ watchForInsert = false, forcePolyfill = false, yrsBack = 80, yrsFwd = 20 } = {}) {
    if (isDateInputSupported && !(forcePolyfill && document.querySelector(`[${forcePickerAttr}]`))) {
        return Promise.resolve(null);
    }
    else {
        return import('./add-pickers').then((module) => {
            return new Promise((resolve /*, _reject */) => {
                let isPickerAdded = false;
                const loaded = () => {
                    if (!isPickerAdded) {
                        isPickerAdded = true;
                        resolve(module.addPickers({ watchForInsert, forcePolyfill, yrsBack, yrsFwd }));
                    }
                };
                if (document.readyState === 'complete') {
                    loaded();
                }
                else {
                    document.addEventListener('DOMContentLoaded', loaded);
                    window.addEventListener('load', loaded);
                }
            });
        });
    }
}
