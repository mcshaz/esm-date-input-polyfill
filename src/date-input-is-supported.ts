const isDateInputSupported = doesSupportDateInput();

export { isDateInputSupported };

function doesSupportDateInput() {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');

    const notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue);
    return input.value !== notADateValue;
}
