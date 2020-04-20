import { getLanguageInfo } from './languages';
import { LookupResult } from './lookup-result';
const lastLookup = {};
export function lookupLocaleText(elementLang) {
    elementLang = elementLang || 'default';
    if (lastLookup[elementLang]) {
        return lastLookup[elementLang];
    }
    let preferredLocales = (window.navigator.languages
        ? window.navigator.languages
        : [window.navigator.userLanguage || window.navigator.language]).map((l) => l.toLowerCase());
    if (elementLang) {
        // trying to emmulate what a native browser might/should do - 1 thing for certain is if the language is not installed on the browser it will not be used
        const beforeHyphen = /^[^-]+/;
        elementLang = elementLang.match(beforeHyphen)[0].toLowerCase();
        const matchesElLang = new LookupResult((l) => l.match(beforeHyphen)[0] === elementLang);
        preferredLocales.forEach((l) => matchesElLang.add(l));
        preferredLocales = matchesElLang.get(true).concat(matchesElLang.get(false));
    }
    return (lastLookup[elementLang] = getLanguageInfo(preferredLocales));
}
