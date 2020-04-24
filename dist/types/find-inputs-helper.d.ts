declare const pickerAppliedAttr = "data-has-picker";
declare const forcePickerAttr = "data-force-date-input-polyfill";
declare class FindInputsHelper {
    readonly forcePolyfill: boolean;
    constructor(forcePolyfill?: boolean);
    requiresPolyfilling(el: Element | null): boolean;
    getAllInputsForPolyfilling(): HTMLInputElement[];
}
export { pickerAppliedAttr, forcePickerAttr, FindInputsHelper };
//# sourceMappingURL=find-inputs-helper.d.ts.map