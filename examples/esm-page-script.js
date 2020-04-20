import { polyfillIfRequired } from './../dist/polyfill-if-required.mjs';

if (window.__esm_page_script_loaded) {
    // https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
    throw new Error('esm-date-input-polyfill has been executed twice - usually a Safari bug');
}
window.__esm_page_script_loaded = true;

export function esmPageScript() {
    // setting the value min & max to be around the current date, purely so that the style of the current date
    // can be displayed, plus the today button can be used.
    setDateAttributes();
    // note we need to wait for the promise to resolve, as if we don't and the date input is polyfilled,
    // the initial valueAsDate property will not have been polyfilled (and therefore undefined)
    polyfillIfRequired().then(() => {
        Array.from(document.getElementsByTagName('output')).forEach((o) => {
            const outputFor = document.getElementById(o.getAttribute('for'));
            if (outputFor) {
                const onInput = o.className === 'date-value'
                    ? () => o.innerHTML = outputFor.value
                    : () => o.innerHTML = String(outputFor.valueAsDate);
                onInput();
                outputFor.addEventListener('input', onInput);
            }
        });
    });
}

function setDateAttributes() {
    const d = new Date();
    const asIso = (dt) => dt.toISOString().slice(0, 10);
    d.setDate(d.getDate() - 2);
    updateDateAttrAndDescriptions('value', asIso(d));
    d.setDate(d.getDate() - 4);
    updateDateAttrAndDescriptions('min', asIso(d));
    d.setDate(d.getDate() + 15);
    updateDateAttrAndDescriptions('max', asIso(d));
}

function updateDateAttrAndDescriptions(attrName, value) {
    Array.from(document.querySelectorAll(`input[${attrName}]`)).forEach((el) => {
        el.setAttribute(attrName, value);
    });
    Array.from(document.querySelectorAll(`span.date-${attrName}`)).forEach((el) => {
        el.innerHTML = value;
    });
}
