export class LookupResult {
    constructor(_keySelector) {
        this._keySelector = _keySelector;
        this._dict = {};
    }
    add(el) {
        let key = this._keySelector(el); // should potentially wrap in String()
        const resType = typeof key;
        if (resType !== 'number' && resType !== 'string' && resType !== 'symbol') {
            key = String(key);
        }
        if (Object.prototype.hasOwnProperty.call(this._dict, key)) {
            this._dict[key].push(el);
        }
        else {
            this._dict[key] = [el];
        }
    }
    get(key) {
        return this._dict[key] || []; // should potentially slice to create new array
    }
}
