// IE11 does not support HTMLElement.closest property. Using this instead.
export function closestWithTruthyProp(el: HTMLElement, propName: string): any {
    let current: any = el;
    do {
        if (current[propName]) {
            return current[propName];
        }
        current = current.parentElement || current.parentNode;
    } while (current !== null && current.nodeType === 1);
    return null;
}

