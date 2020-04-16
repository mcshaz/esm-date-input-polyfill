export class LookupResult {
    constructor(keySelector) {
        this._dict = {};
        this._keySelector = keySelector;
    }

    add(el) {
        const res = this._keySelector(el); // should potentially wrap in String()
        if (Object.prototype.hasOwnProperty.call(this._dict, res)) {
            this._dict[res].push(el);
        } else {
            this._dict[res] = [el];
        }
    }

    get(key) {
        return this._dict[key] || []; // should potentially slice to create new array
    }
}