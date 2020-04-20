import { Picker } from './picker';
import { pickerAppliedAttr } from './find-inputs-helper';
import { isDateInputSupported } from './date-input-is-supported';
import { closestWithTruthyProp } from './closest-with-truthy-prop';
import { ParseResult } from './locale-date-handler';
import { lookupLocaleText } from './lookup-locale-text';
const validIsoDateRx = /^\d{4}-\d{2}-\d{2}$/;
export class Input {
    constructor(element) {
        this.element = element;
        this.element.setAttribute(pickerAppliedAttr, '');
        this.element.setAttribute('autocomplete', 'off'); // otherwise autocomplete suggestion hides date picker
        if (isDateInputSupported) {
            // this wil both prevent the native datepicker displaying AND allow asigning a value attribute which is not ISO8601 compliant
            this.element.type = 'date-polyfill';
            // this.element.addEventListener('click', preventDefault);
        }
        const cultureInfo = lookupLocaleText(closestWithTruthyProp(this.element, 'lang') || void 0);
        this.dateHandler = cultureInfo.dateHandler;
        this.selectedLocale = cultureInfo.selectedLocale;
        this.translation = cultureInfo.translation;
        if (!this.element.placeholder) {
            this.element.placeholder = this.dateHandler.placeholder();
        }
        if (!this.element.title) {
            this.element.title = this.element.placeholder;
        }
        this.element.pattern = this.dateHandler.validateLocaleDateString.source;
        let valuePropDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.element), 'value');
        if (!valuePropDescriptor) {
            valuePropDescriptor = { get: () => this.element.getAttribute('value') || '', set: (value) => this.element.setAttribute('value', value) };
            console.log('esm-date-input-polyfill: unable to obtain native input[type=date] .value propertyDescriptor');
        }
        Object.defineProperties(this.element, {
            'textValue': {
                get: valuePropDescriptor.get,
                set: valuePropDescriptor.set
            },
            'value': {
                get: () => this.element._datePolyfillVal
                    ? new Date(this.element._datePolyfillVal).toISOString().slice(0, 10)
                    : '',
                set: (val) => this.element.valueAsDate = (val && validIsoDateRx.test(val))
                    ? new Date(val)
                    : null,
            },
            'valueAsDate': {
                get: () => this.element._datePolyfillVal
                    ? new Date(this.element._datePolyfillVal)
                    : null,
                set: (val) => {
                    if (val && val.getTime && !isNaN(this.element._datePolyfillVal = val.getTime())) {
                        this.element.textValue = this.dateHandler.toLocaleDateString(val);
                    }
                    else {
                        this.element.textValue = '';
                        this.element._datePolyfillVal = void 0;
                    }
                    this.validate();
                }
            },
            'valueAsNumber': {
                get: () => this.element._datePolyfillVal === void 0
                    ? NaN
                    : this.element._datePolyfillVal,
                set: (val) => this.element.valueAsDate = new Date(val),
            },
            'min': {
                get: () => this.element.getAttribute('min'),
                set: (val) => validIsoDateRx.test(val)
                    ? this.element.setAttribute('min', val)
                    : this.element.removeAttribute('min'),
            },
            'max': {
                get: () => this.element.getAttribute('max'),
                set: (val) => validIsoDateRx.test(val)
                    ? this.element.setAttribute('max', val)
                    : this.element.removeAttribute('max'),
            }
        });
        // Initialize value for display.
        if (!this.element.setCustomValidity) {
            console.log('HTMLElement.setCustomValidity not supported');
            this.element.setCustomValidity = () => void 0;
        }
        this.element.value = this.element.getAttribute('value') || '';
        // Open the picker when the input get focus,
        // also on various click events to capture it in all corner cases.
        const showPicker = () => Picker.getInstance().attachTo(this);
        const passiveOpt = { passive: true };
        this.element.addEventListener('focus', showPicker, passiveOpt);
        this.element.addEventListener('mousedown', showPicker, passiveOpt);
        this.element.addEventListener('mouseup', showPicker, passiveOpt);
        // Update the picker if the date changed manually in the input.
        this.element.addEventListener('keydown', e => {
            let beginValue = this.element.valueAsDate;
            let willRequirePing = true;
            let willRequireParse = false;
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    Picker.getInstance().hide();
                    willRequirePing = false;
                    break;
                case 38:
                    if (beginValue === null) {
                        beginValue = new Date();
                    }
                    beginValue.setDate(beginValue.getDate() + 1);
                    this.element.valueAsDate = beginValue;
                    break;
                case 40:
                    if (beginValue === null) {
                        beginValue = new Date();
                    }
                    beginValue.setDate(beginValue.getDate() - 1);
                    this.element.valueAsDate = beginValue;
                    break;
                default:
                    willRequireParse = true;
            }
            if (willRequirePing) {
                if (willRequireParse) {
                    setTimeout(() => {
                        let parsedDt = this.dateHandler.parse(this.element.textValue);
                        if (parsedDt instanceof Date) {
                            parsedDt.setTime(parsedDt.getTime() - parsedDt.getTimezoneOffset() * 60000);
                        }
                        else {
                            if (parsedDt === ParseResult.invalidDate
                                || parsedDt === ParseResult.invalidMonth
                                || parsedDt === ParseResult.invalidYear) {
                                this.element.setCustomValidity(this.dateHandler.placeholder(parsedDt));
                            }
                            else {
                                this.element.setCustomValidity('');
                            }
                            parsedDt = new Date(NaN);
                        }
                        if (+parsedDt !== this.element.valueAsNumber
                            || isNaN(parsedDt) !== isNaN(this.element.valueAsNumber)) {
                            this.element.valueAsDate = parsedDt;
                            const picker = Picker.getInstance();
                            picker.pingInput();
                            picker.sync();
                        }
                    }, 1);
                }
                else {
                    const picker = Picker.getInstance();
                    picker.pingInput();
                    picker.sync();
                }
            }
        }, passiveOpt);
    }
    validate() {
        if (this.element._datePolyfillVal) {
            const minDate = new Date(this.element.min || NaN);
            const maxDate = new Date(this.element.max || NaN);
            if (this.element._datePolyfillVal < minDate.getTime()) {
                this.element.setCustomValidity('≥ ' + this.dateHandler.toLocaleDateString(minDate));
                return false;
            }
            else if (this.element._datePolyfillVal > maxDate.getTime()) {
                this.element.setCustomValidity('≤ ' + this.dateHandler.toLocaleDateString(maxDate));
                return false;
            }
        }
        this.element.setCustomValidity('');
        return true;
    }
}
