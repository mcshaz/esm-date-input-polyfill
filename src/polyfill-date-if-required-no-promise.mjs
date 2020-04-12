import { doesSupportDateInput } from './doesSupportDateInput.mjs';
import { InsertScript } from './InsertScript';

export function polyfillDateIfRequired() {
  const diSupport = doesSupportDateInput();
  if (diSupport.supported && !diSupport.hasScriptDebugAttr) {
    return {
      then(fn) {
        this._lastVal = fn(this._lastVal);
        return this;
      }
    }
  } else {
    return InsertScript('./dist/nodep-date-input-pollyfill.dist.js');
  }
}