import Picker from './Picker.mjs';
import Input from './Input.mjs';

export function addPickers() {
    Picker.instance = new Picker();
    Input.addPickerToDateInputs();
}