const dateInputIsSupported = doesSupportDateInput();

export { dateInputIsSupported };

function doesSupportDateInput() {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');

    const notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue);
    return input.value !== notADateValue;
}
