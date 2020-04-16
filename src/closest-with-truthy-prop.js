// IE11 does not support HTMLElement.closest property. Using this instead.
export function closestWithTruthyProp(el, propName) {
    do {
        if (el[propName]) {
            return el[propName];
        }
        el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
}

