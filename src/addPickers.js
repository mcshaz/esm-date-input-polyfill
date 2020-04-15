import Picker from './Picker.js';
import Input from './Input.js';
import { FindInputsHelper } from './FindInputsHelper.js';

export function addPickers({ watchForInsert = false, allowForcePicker = false, yrsBack = 80, yrsFwd = 20 } = {}) {
    Picker.instance = new Picker({yrsBack, yrsFwd});
    const findHelper = new FindInputsHelper({ allowForcePicker });
        // Get and loop all the input[type="date"]s in the page that do not have `[data-has-picker]` yet.
    findHelper.getAllInputsForPolyfilling().forEach((di) => new Input(di));
    if (watchForInsert) {
        const observer = new MutationObserver((mutations) => 
            mutations.forEach((m) => {
                if(m.type === 'childList') {
                    m.addedNodes.forEach((el) => {
                        if (el.nodeType === Node.ELEMENT_NODE) {
                            // [el, ...el.querySelectorAll('input[type=date]')] should do, but some problem with transpilling
                            // firefox fine with same transpile, but IE somehow tries to implement es.string.iterator rather than nodelist!
                            const nodes = Array.from(el.querySelectorAll('input[type=date]'));
                            nodes.push(el);
                            nodes.forEach((inpt) => {
                                if (findHelper.requiresPolyfilling(inpt)) {
                                    new Input(inpt);
                                }
                            });
                        }
                    });
                }
            })
        );
        const observe = () => observer.observe(document.body, {
            childList: true,
            attributes: false,
            subtree: true,
        });
        Picker.instance.onBeforeOpen(() => {
            observer.disconnect();
            setTimeout(observe, 100);
        });
        observe();
        // call `observe` on that MutationObserver instance, 
        // passing it the element to observe, and the options object


        // this might not be the best way to handle this as it will not add placeholder until clicked
        /*
        document.body.addEventListener('mousedown', (evt)=> {
            if (findHelper.requiresPolyfilling(evt.target)) {
                return new Input(evt.target);
            }
        }, { passive: true });
        */
    }
}