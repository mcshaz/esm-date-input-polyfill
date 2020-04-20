// IE11 does not support HTMLElement.closest property. Using this instead.
export function closestWithTruthyProp(el, propName) {
    let current = el;
    do {
        if (current[propName]) {
            return current[propName];
        }
        current = current.parentElement || current.parentNode;
    } while (current !== null && current.nodeType === 1);
    return null;
}
