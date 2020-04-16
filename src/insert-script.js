// it would be nicer with promise/await, but more polyfills will be downloaded which are
// not required by modern browsers
// not this in particular does not handle reject, returning promises etc.
// if that is what you want look at the polyfill-date-if-require-dynamic-import & polyfill properly
export class InsertScript {
    // _DOMContentLoaded = false;
    // _readyFunctions = [];
    constructor(src) {
        this._DOMContentLoaded = false;
        this._readyFunctions = [];
        this.loadScript(src);
    }
    then(fn) {
        if (this._DOMContentLoaded) {
            this._lastVal = fn(this._lastVal);
        } else {
            this._readyFunctions.push(fn);
        }
        return this;
    }
    _executeWaitingScripts(e) {
        if(!DOMContentLoaded) {
            this._DOMContentLoaded = true;
            this._readyFunctions.forEach((f) => (this._lastVal = f(this._lastVal)));
            this._readyFunctions = void 0;
        }
    }
    _loadScript(src) {
        const cleanup = (script) => {
            URL.revokeObjectURL(script.src);
            script.remove();
        };
        const script = Object.assign(document.createElement('script'), {
            src,
            onerror() {
                cleanup(script);
                throw new Error(`Failed to import: ${url}`);
            },
            onload:(e) => {
                if(document.readyState === `complete`) {
                    this._executeWaitingScripts(e);
                } else {
                    document.addEventListener(`DOMContentLoaded`, (evt) => this._executeWaitingScripts(evt));
                    window.addEventListener(`load`, (evt) => this._executeWaitingScripts(evt));
                }
                cleanup(script);
            },
        });
        document.head.appendChild(script);
    }
}
