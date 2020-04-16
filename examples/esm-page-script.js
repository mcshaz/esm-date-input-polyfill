import { polyfillIfRequired } from './../dist/polyfill-if-required.mjs';

if (window.__esm_page_script_loaded) {
    // https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
    throw new Error('esm-date-input-polyfill has been executed twice - usually a Safari bug');
}
window.__esm_page_script_loaded = true;

export function esmPageScript() {
    // note we need to wait as if we don't and the date input is polyfilled,
    // the initial valueAsDate reference will not have been polyfilled (and therefore undefined)
    polyfillIfRequired().then(() => {
        Array.from(document.getElementsByTagName('output')).forEach((o) => {
            const outputFor = document.getElementById(o.getAttribute('for'));
            if (outputFor) {
                var onInput = o.className === 'date-value'
                    ? () => o.innerHTML = outputFor.value
                    : () => o.innerHTML = String(outputFor.valueAsDate);
                onInput();
                outputFor.addEventListener('input', onInput);
            }
        });
    });
}
