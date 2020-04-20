import { Picker } from './picker';
import { Input } from './input';
import { FindInputsHelper } from './find-inputs-helper';
export function addPickers({ watchForInsert = false, forcePolyfill = false, yrsBack = 80, yrsFwd = 20 } = {}) {
    Picker.createInstance({ yrsBack, yrsFwd });
    const findHelper = new FindInputsHelper(forcePolyfill);
    // Get and loop all the input[type="date"]s in the page that do not have `[data-has-picker]` yet.
    const polyfilledInputs = findHelper.getAllInputsForPolyfilling().map((di) => new Input(di));
    if (watchForInsert) {
        const observer = new MutationObserver((mutations) => mutations.forEach((m) => {
            if (m.type === 'childList') {
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
        }));
        const observe = () => observer.observe(document.body, {
            childList: true,
            attributes: false,
            subtree: true,
        });
        Picker.getInstance().onBeforeOpen(() => {
            observer.disconnect();
            setTimeout(observe, 100);
        });
        observe();
    } // end watchForInsert logic
    return polyfilledInputs.length
        ? polyfilledInputs
        : null;
    // this might not be the best way to handle this as it will not add placeholder until clicked
    /*
    document.body.addEventListener('mousedown', (evt)=> {
        if (findHelper.requiresPolyfilling(evt.target)) {
            return new Input(evt.target);
        }
    }, { passive: true });
    */
}
