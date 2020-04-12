import { doesSupportDateInput } from './doesSupportDateInput.mjs';
// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
export function polyfillDateIfRequired() {
  const diSupport = doesSupportDateInput();
  if (diSupport.supported && !diSupport.hasScriptDebugAttr) {
    return Promise.resolve();
  } else {
    import('./addPickers.mjs').then((module) => {
      return new Promise((resolve, _reject) => {
        const loaded = () => {
          module.addPickers();
          if (diSupport.hasScriptDebugAttr) {
            const pd = (evt) => evt.preventDefault();
            document.querySelectorAll('input[type=date]')
              .forEach((el) => el.addEventListener('click', pd));
          }
          resolve();
        }
        if (document.readyState === 'complete') {
          loaded();
        }
        document.addEventListener('DOMContentLoaded', loaded);
        window.addEventListener('load', loaded);
      });
    });
  }
}