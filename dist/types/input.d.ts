import { LanguageDateNames, LocaleDateInfo } from './languages';
import { LocaleDateHandler } from './locale-date-handler';
export interface PolyfilledDateInput extends HTMLInputElement {
    textValue: string;
    _datePolyfillVal?: number;
}
export declare class Input implements LocaleDateInfo {
    readonly element: PolyfilledDateInput;
    readonly selectedLocale: string;
    readonly dateHandler: LocaleDateHandler;
    readonly translation: LanguageDateNames;
    constructor(element: HTMLInputElement);
    validate(): boolean;
}
//# sourceMappingURL=input.d.ts.map