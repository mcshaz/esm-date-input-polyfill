import { LocaleDateHandler } from './locale-date-handler';
export interface LanguageDateNames {
    today: string;
    weekdays: string[];
    months: string[];
}
export interface LocaleDateInfo {
    selectedLocale: string;
    dateHandler: LocaleDateHandler;
    translation: LanguageDateNames;
}
export declare function getLanguageInfo(localeNames: string[]): LocaleDateInfo;
//# sourceMappingURL=languages.d.ts.map