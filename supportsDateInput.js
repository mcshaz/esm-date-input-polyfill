  // Return false if the browser does not support input[type="date"].
  export function supportsDateInput() {
    const input = document.createElement(`input`);
    input.setAttribute(`type`, `date`);

    const notADateValue = `not-a-date`;
    input.setAttribute(`value`, notADateValue);

    return (
      (
        document.currentScript
        && !document.currentScript.hasAttribute(`data-nodep-date-input-polyfill-debug`)
      )
      && !(input.value === notADateValue)
    );
  }
  