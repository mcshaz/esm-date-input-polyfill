export declare class LookupResult<TKey extends string | number | symbol | boolean | bigint, TValue> {
    private readonly _keySelector;
    private _dict;
    constructor(_keySelector: (t: TValue) => TKey);
    add(el: TValue): void;
    get(key: TKey): TValue[];
}
//# sourceMappingURL=lookup-result.d.ts.map