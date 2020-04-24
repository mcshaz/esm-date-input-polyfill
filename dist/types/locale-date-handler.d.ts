export declare enum ParseResult {
    empty = "empty",
    regexMismatch = "mismatch",
    invalidDate = "D",
    invalidMonth = "M",
    invalidYear = "Y"
}
declare type DatePartKey = 'D' | 'M' | 'Y';
interface PlaceholderChars {
    dd: string;
    mm: string;
    yyyy: string;
}
export declare class LocaleDateHandler {
    placeholderChars: PlaceholderChars;
    readonly format: string;
    readonly validateLocaleDateString: RegExp;
    private _localeOrder;
    constructor(format: string, placeholderChars?: PlaceholderChars);
    parse(dtStr: string): Date | ParseResult;
    placeholder(highlight?: DatePartKey): string;
    toLocaleDateString(dt: Date): string;
}
export {};
//# sourceMappingURL=locale-date-handler.d.ts.map