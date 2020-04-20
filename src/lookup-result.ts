export class LookupResult<TKey extends string | number | symbol | boolean | bigint, TValue> {

    private _dict: any = {};
    constructor(private readonly _keySelector: (t: TValue) => TKey) {}

    add(el: TValue) {
        let key: string | number | symbol = this._keySelector(el) as any; // should potentially wrap in String()
        const resType = typeof key;
        if (resType !== 'number' && resType !== 'string' && resType !== 'symbol') {
            key = String(key);
        }
        if (Object.prototype.hasOwnProperty.call(this._dict, key)) {
            this._dict[key].push(el);
        } else {
            this._dict[key] = [el];
        }
    }

    get(key: TKey): TValue[] {
        return this._dict[key] || []; // should potentially slice to create new array
    }
}