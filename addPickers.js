import Picker from './picker.js';
import Input from './input.js';

export function addPickers() {
    Picker.instance = new Picker();
    Input.addPickerToDateInputs();
}