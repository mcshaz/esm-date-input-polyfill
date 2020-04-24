// Localizations for UI text.
export enum ParseResult {
    empty = 'empty',
    regexMismatch = 'mismatch',
    invalidDate = 'D',
    invalidMonth = 'M',
    invalidYear = 'Y',
}

type DatePartKey = 'D' | 'M' | 'Y';
interface PlaceholderChars { dd: string; mm: string; yyyy: string }

export class LocaleDateHandler {
    readonly format: string;
    readonly validateLocaleDateString: RegExp;
    private _localeOrder: [number, number, number];

    constructor(format: string, public placeholderChars: PlaceholderChars = { dd: 'dd', mm: 'mm', yyyy: 'yyyy' }) {
        this.format = format;
        const pattern = format.replace(/\./g, '\\.') // note period is the only charachter requiring escaping in the formats above
            .replace('Y', '([12]\\d{3})')
            .replace('M', '([01]?\\d)')
            .replace('D', '([0-3]?\\d)');
        this.validateLocaleDateString = new RegExp(pattern);

        const mthIndx = format.indexOf('M');
        // only 3 permutaions in use: DMY, YMD & MDY
        if (format.indexOf('Y') < mthIndx) {
            this._localeOrder = [ 1, 2, 3 ]; // y, m, d
        } else {
            const dtIndx = format.indexOf('D');
            if (dtIndx < mthIndx) {
                this._localeOrder = [ 3, 2, 1 ]; // d, m, y
            } else {
                this._localeOrder = [ 3, 1, 2 ]; // m, d, y
            }
        }
    }
    
    parse(dtStr: string) {
        if (!dtStr) {
            return ParseResult.empty;
        }
        const dateMatch = this.validateLocaleDateString.exec(dtStr);
        if (!dateMatch) { return ParseResult.regexMismatch; }
        const yr = parseInt(dateMatch[this._localeOrder[0]], 10);
        const mth = parseInt(dateMatch[this._localeOrder[1]], 10) - 1;
        const dt = parseInt(dateMatch[this._localeOrder[2]], 10);
        const returnVar = new Date(yr, mth, dt);
        if (returnVar.getDate() !== dt) {
            return ParseResult.invalidDate;
        } else if (returnVar.getMonth() !== mth) {
            return ParseResult.invalidMonth;
        } else if (returnVar.getFullYear() !== yr) {
            return ParseResult.invalidYear;
        }
        return returnVar;
    }

    placeholder(highlight?: DatePartKey) {
        let returnVar = this.format;
        let replaceWithHighlight = (find: DatePartKey, replace: string, highlight?: DatePartKey) =>
            returnVar = returnVar.replace(find, highlight === find ? `**${replace.toUpperCase()}**` : replace);
        replaceWithHighlight( 'D', this.placeholderChars.dd, highlight);
        replaceWithHighlight('M', this.placeholderChars.mm, highlight);
        replaceWithHighlight('Y', this.placeholderChars.yyyy, highlight);
        return returnVar;
    }

    toLocaleDateString(dt: Date) {
        const ymd = dt.toISOString().slice(0,10).split('-');
        return this.format
            .replace('Y', ymd[0])
            .replace('M', ymd[1])
            .replace('D', ymd[2]);
    }

}
