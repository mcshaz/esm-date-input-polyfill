// Localizations for UI text.
export var ParseResult;
(function (ParseResult) {
    ParseResult["empty"] = "empty";
    ParseResult["regexMismatch"] = "mismatch";
    ParseResult["invalidDate"] = "D";
    ParseResult["invalidMonth"] = "M";
    ParseResult["invalidYear"] = "Y";
})(ParseResult || (ParseResult = {}));
export class LocaleDateHandler {
    constructor(format, placeholderChars = { dd: 'dd', mm: 'mm', yyyy: 'yyyy' }) {
        this.placeholderChars = placeholderChars;
        this.format = format;
        const pattern = format.replace(/\./g, '\\.') // note period is the only charachter requiring escaping in the formats above
            .replace('Y', '([12]\\d{3})')
            .replace('M', '([01]?\\d)')
            .replace('D', '([0-3]?\\d)');
        this.validateLocaleDateString = new RegExp(pattern);
        const mthIndx = format.indexOf('M');
        // only 3 permutaions in use: DMY, YMD & MDY
        if (format.indexOf('Y') < mthIndx) {
            this._localeOrder = [1, 2, 3]; // y, m, d
        }
        else {
            const dtIndx = format.indexOf('D');
            if (dtIndx < mthIndx) {
                this._localeOrder = [3, 2, 1]; // d, m, y
            }
            else {
                this._localeOrder = [3, 1, 2]; // m, d, y
            }
        }
    }
    parse(dtStr) {
        if (!dtStr) {
            return ParseResult.empty;
        }
        const dateMatch = this.validateLocaleDateString.exec(dtStr);
        if (!dateMatch) {
            return ParseResult.regexMismatch;
        }
        const yr = parseInt(dateMatch[this._localeOrder[0]], 10);
        const mth = parseInt(dateMatch[this._localeOrder[1]], 10) - 1;
        const dt = parseInt(dateMatch[this._localeOrder[2]], 10);
        const returnVar = new Date(yr, mth, dt);
        if (returnVar.getDate() !== dt) {
            return ParseResult.invalidDate;
        }
        else if (returnVar.getMonth() !== mth) {
            return ParseResult.invalidMonth;
        }
        else if (returnVar.getFullYear() !== yr) {
            return ParseResult.invalidYear;
        }
        return returnVar;
    }
    placeholder(highlight) {
        let returnVar = this._replaceWithHighlight('D', this.placeholderChars.dd, highlight);
        returnVar = this._replaceWithHighlight('M', this.placeholderChars.mm, highlight);
        returnVar = this._replaceWithHighlight('Y', this.placeholderChars.yyyy, highlight);
        return returnVar;
    }
    toLocaleDateString(dt) {
        const ymd = dt.toISOString().slice(0, 10).split('-');
        return this.format
            .replace('Y', ymd[0])
            .replace('M', ymd[1])
            .replace('D', ymd[2]);
    }
    _replaceWithHighlight(find, replace, highlight) {
        return this.format.replace(find, highlight === find ? `**${replace.toUpperCase()}**` : replace);
    }
}
