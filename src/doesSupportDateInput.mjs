export const forceDatePolyfillAttr = 'data-nodep-date-input-polyfill-debug';

export function doesSupportDateInput() {
  const input = document.createElement('input');
  input.setAttribute('type', 'date');

  const notADateValue = 'not-a-date';
  input.setAttribute('value', notADateValue);
  return {
    supported: input.value !== notADateValue,
    hasScriptDebugAttr: document.currentScript
      ? document.currentScript.hasAttribute(forceDatePolyfillAttr)
      : void 0
  };
}
  