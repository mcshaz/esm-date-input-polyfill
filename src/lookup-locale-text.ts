import { LocaleDateInfo, getLanguageInfo } from './languages';
import { LookupResult } from './lookup-result';

const lastLookup: {[key: string]: LocaleDateInfo} = {};
export function lookupLocaleText(elementLang?: string | null) {
    elementLang = elementLang || 'default';
    if (lastLookup[elementLang]) {
        return lastLookup[elementLang];
    }
    let preferredLocales = (window.navigator.languages
        ? window.navigator.languages
        : [ (window.navigator as any).userLanguage as string || window.navigator.language ]
    ).map((l) => l.toLowerCase());

    if (elementLang) {
        // trying to emmulate what a native browser might/should do - 1 thing for certain is if the language is not installed on the browser it will not be used
        const beforeHyphen=/^[^-]+/;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        elementLang = elementLang.match(beforeHyphen)![0].toLowerCase();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const matchesElLang = new LookupResult<boolean, string>((l) => l.match(beforeHyphen)![0] === elementLang);
        preferredLocales.forEach((l) => matchesElLang.add(l));
        preferredLocales = matchesElLang.get(true).concat(matchesElLang.get(false));
    }

    return (lastLookup[elementLang] = getLanguageInfo(preferredLocales));
}