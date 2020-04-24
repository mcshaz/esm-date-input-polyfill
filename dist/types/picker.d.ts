import './esm-date-input-polyfill.scss';
import { LocaleDateInfo } from './languages';
interface InputPolyfill extends LocaleDateInfo {
    element: HTMLInputElement;
}
export declare class Picker {
    date: Date;
    input: InputPolyfill | null;
    isOpen: boolean;
    year: HTMLSelectElement;
    month: HTMLSelectElement;
    today: HTMLButtonElement;
    container: HTMLElement;
    daysHead: HTMLTableSectionElement;
    days: HTMLTableSectionElement;
    private _locale?;
    private _onBeforeOpen;
    private static _instance;
    private constructor();
    private get dateAtUtcMidnight();
    hide(): void;
    show(): void;
    onBeforeOpen(fn: () => void): void;
    goto(element: HTMLElement): void;
    attachTo(input: InputPolyfill): boolean;
    sync(): void;
    setInput(): void;
    refreshLocale(): boolean;
    refreshDaysMatrix(): void;
    pingInput(): void;
    static createInstance({ yrsBack, yrsFwd }?: {
        yrsBack?: number;
        yrsFwd?: number;
    }): void;
    static getInstance(): Picker;
    static createRangeSelect(theSelect: HTMLSelectElement, min: number, max: number, namesArray?: string[], selectedValue?: number): HTMLSelectElement;
    static utcDateToLocal(dt?: Date | number | string | null): Date | null;
}
export {};
//# sourceMappingURL=picker.d.ts.map