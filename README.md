# esm-date-input-polyfill

Just include this simple script and IE, macOS Safari, and legacy browser versions will support `<input type="date">`, without any dependencies, not even jQuery!

Support dynamically created inputs, so can be used in single page applications.

Forked from [nodep-date-input-polyfill](https://github.com/brianblakely/esm-date-input-polyfill) which was in turn forked from [html5-simple-date-input-polyfill](https://www.npmjs.com/package/html5-simple-date-input-polyfill). Continuing as a separate project.

## Demo

[Try it in IE, macOS Safari, and legacy browser versions.](https://brianblakely.github.io/esm-date-input-polyfill/)

## Install

### NPM

`npm install --save esm-date-input-polyfill`

Add to your project:

* **Webpack / Rollup / Babel / ES:** `import 'esm-date-input-polyfill';` note this script uses ECMAScript Modules [ESM - the name of the repo] rather than common JS to export modules. This means your development machine will need Node 10.2 or greater installed.

* **Script Tag:** Copy `esm-date-input-polyfill.js` from `node_modules` and include it anywhere in your HTML. This will use an Immediately invoked function expression (IIFE) which creates the object `window.nodepDateInputPolyfill`

### Getting Started

Execute the polyfillDateIfRequired function. The options are { watchForInsert: false, allowForcePicker: false }. The function returns a `promise`

watchForInsert
: `[default: false]` Set up a `MutationObserver` to look for dynamically inserted date-inputs. Should be false if the page does not dynamically insert DOM nodes for performance reasons. If your page heavily uses animations, it is possible this slows your page down. Originally this script had only run on mousedown event (e.g. when entering the input for the first time), which is more performant, but results in no placeholder being added until after the user has clicked the mouse somewhere on the page. The old code is still commented out in addPickers.js if that better suits your needs.

allowForcePicker
: `[default: false]` Will apply the date-input polyfill _even if_ the browser natively supports date-input elements, **if** the input element or any ancestor of the input elment has a `data-force-esm-date-input-polyfill` attribute. In order to work, forcing the polyfill _when date inputs are natively supported_ will change the `type` attribute of the date-input from `date` to `date-polyfill`.

Returns
: A `promise` which is resolved after the DOM content has been loaded and all date-input elements in the document at this point have been polyfilled. If the browser supports date-inputs and `allowForcePicker` is false [default], the promise will resolve immediately.

 * **Webpack / Rollup / Babel / ES:** Using the module/nomodule approach. Have a look at the example in this repository:
 - Create an entry (input) [.js or .mjs or .ts] [file for browsers which support ECMAScript modules](https://github.com/mcshaz/esm-date-input-polyfill/blob/master/gest-age.module.js), which includes a polyfill for dynamic import in browsers which support modules but not dynamic import statements. 
 - Have a [seperate entry file for legacy browsers](https://github.com/mcshaz/esm-date-input-polyfill/blob/master/gest-age.nomodule.js).
 - Modern browsers will only download a tiny file to check for date-input support, and download the appropriate polyfill only if date inputs are not natively supported.
 - Older browsers will download the full executable. see https://github.com/mcshaz/esm-date-input-polyfill/tree/master/examples and the rollup config at https://github.com/mcshaz/esm-date-input-polyfill/blob/master/rollup.config.js. 
 - Check if the script has already been run in the common file the 2 enty files point to (a problem with Safari 10 respecting `<script type="module" src="...">` but _not_ respecting `<script nomodule src="...">`).
```javascript
import { polyfillDateIfRequired } from './dist/polyfill-date-if-required-dynamic-import.mjs';
if (window.__my_script_loaded) { // https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
    throw new error("[my-script] has been executed twice - usually a Safari bug");
}
window.__my_script_loaded = true;
export function myScript() {
    polyfillDateIfRequired({watchForInsert: true}).then(function() {
```

* **Script Tag:**
Execute `nodepDateInputPolyfill.polyfillDateIfRequired()` with any options described above. See the example of this workflow here.


## Features
* **Easily Stylable:** [These are the default styles](https://github.com/brianblakely/esm-date-input-polyfill/blob/master/esm-date-input-polyfill.scss), which you may override with your own.

* **Polyfills `valueAsDate` and `valueAsNumber`:**
[Learn more about these properties.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#property-valueasdate). They behave as getters and setters.

* **Keyboard Shortcuts:** `Esc` will hide the datepicker. `Up/Down` will increment/decrement the date by one day.

* **Localization:** As per native `<input type="date">` implementations, this uses the browser default locale settings.

    Currently supported:
    - languages:
Afrikaans, Albanian, Alsatian, Amharic, Arabic, Armenian, Assamese, Azeri, Bashkir, Basque, Belarusian, Bengali, Bosnian, Breton, Bulgarian, Catalan, Chinese - Simplified, Chinese - Traditional, Corsican, Croatian, Czech, Danish, Dari, Divehi, Dutch, English, Estonian, Faroese, Filipino, Finnish, French, Frisian, Galician, Georgian, German, Greek, Greenlandic, Gujarati, Hausa, Hebrew, Hindi, Hungarian, Icelandic, Igbo, Indonesian, Inuktitut, Irish, Italian, Japanese, K'iche, Kannada, Kazakh, Khmer, Kinyarwanda, Kiswahili, Konkani, Korean, Kyrgyz, Lao, Latvian, Lithuanian, Lower Sorbian, Luxembourgish, Macedonian (FYROM), Malay, Malayalam, Maltese, Maori, Mapudungun, Marathi, Mohawk, Mongolian, Nepali, Norwegian, Norwegian (Bokmål), Norwegian (Nynorsk), Occitan, Oriya, Pashto, Persian, Polish, Portuguese, Punjabi, Quechua, Romanian, Romansh, Russian, Sami (Inari), Sami (Lule), Sami (Northern), Sami (Skolt), Sami (Southern), Sanskrit, Scottish Gaelic, Serbian, Sesotho sa Leboa, Setswana , Sinhala, Slovak, Slovenian, Spanish, Swedish, Syriac, Tajik, Tamazight, Tamil, Tatar, Telugu, Thai, Tibetan, Turkish, Turkmen, Ukrainian, Upper Sorbian, Urdu, Uyghur, Uzbek, Vietnamese, Welsh, Wolof, Yakut, Yi, Yoruba, isiXhosa, isiZulu
    - locales: af, af-za, am, am-et, ar, ar-ae, ar-bh, ar-dz, ar-eg, ar-iq, ar-jo, ar-kw, ar-lb, ar-ly, ar-ma, ar-om, ar-qa, ar-sa, ar-sy, ar-tn, ar-ye, arn, arn-cl, as, as-in, az, az-cyrl, az-cyrl-az, az-latn, az-latn-az, ba, ba-ru, be, be-by, bg, bg-bg, bn, bn-bd, bn-in, bo, bo-cn, br, br-fr, bs, bs-cyrl, bs-cyrl-ba, bs-latn, bs-latn-ba, ca, ca-es, co, co-fr, cs, cs-cz, cy, cy-gb, da, da-dk, de, de-at, de-ch, de-de, de-li, de-lu, dsb, dsb-de, dv, dv-mv, el, el-gr, en, en-029, en-au, en-bz, en-ca, en-gb, en-ie, en-in, en-jm, en-my, en-nz, en-ph, en-sg, en-tt, en-us, en-za, en-zw, es, es-ar, es-bo, es-cl, es-co, es-cr, es-do, es-ec, es-es, es-gt, es-hn, es-mx, es-ni, es-pa, es-pe, es-pr, es-py, es-sv, es-us, es-uy, es-ve, et, et-ee, eu, eu-es, fa, fa-ir, fi, fi-fi, fil, fil-ph, fo, fo-fo, fr, fr-be, fr-ca, fr-ch, fr-fr, fr-lu, fr-mc, fy, fy-nl, ga, ga-ie, gd, gd-gb, gl, gl-es, gsw, gsw-fr, gu, gu-in, ha, ha-latn, ha-latn-ng, he, he-il, hi, hi-in, hr, hr-ba, hr-hr, hsb, hsb-de, hu, hu-hu, hy, hy-am, id, id-id, ig, ig-ng, ii, ii-cn, is, is-is, it, it-ch, it-it, iu, iu-cans, iu-cans-ca, iu-latn, iu-latn-ca, ja, ja-jp, ka, ka-ge, kk, kk-kz, kl, kl-gl, km, km-kh, kn, kn-in, ko, ko-kr, kok, kok-in, ky, ky-kg, lb, lb-lu, lo, lo-la, lt, lt-lt, lv, lv-lv, mi, mi-nz, mk, mk-mk, ml, ml-in, mn, mn-cyrl, mn-mn, mn-mong, mn-mong-cn, moh, moh-ca, mr, mr-in, ms, ms-bn, ms-my, mt, mt-mt, nb, nb-no, ne, ne-np, nl, nl-be, nl-nl, nn, nn-no, no, nso, nso-za, oc, oc-fr, or, or-in, pa, pa-in, pl, pl-pl, prs, prs-af, ps, ps-af, pt, pt-br, pt-pt, qut, qut-gt, quz, quz-bo, quz-ec, quz-pe, rm, rm-ch, ro, ro-ro, ru, ru-ru, rw, rw-rw, sa, sa-in, sah, sah-ru, se, se-fi, se-no, se-se, si, si-lk, sk, sk-sk, sl, sl-si, sma, sma-no, sma-se, smj, smj-no, smj-se, smn, smn-fi, sms, sms-fi, sq, sq-al, sr, sr-cyrl, sr-cyrl-ba, sr-cyrl-cs, sr-cyrl-me, sr-cyrl-rs, sr-latn, sr-latn-ba, sr-latn-cs, sr-latn-me, sr-latn-rs, sv, sv-fi, sv-se, sw, sw-ke, syr, syr-sy, ta, ta-in, te, te-in, tg, tg-cyrl, tg-cyrl-tj, th, th-th, tk, tk-tm, tn, tn-za, tr, tr-tr, tt, tt-ru, tzm, tzm-latn, tzm-latn-dz, ug, ug-cn, uk, uk-ua, ur, ur-pk, uz, uz-cyrl, uz-cyrl-uz, uz-latn, uz-latn-uz, vi, vi-vn, wo, wo-sn, xh, xh-za, yo, yo-ng, zh, zh-chs, zh-cht, zh-cn, zh-hans, zh-hant, zh-hk, zh-mo, zh-sg, zh-tw, zu, zu-za
## Usage Notes

* `getAttribute('value')` and `setAttribute('value', ...)` and the elements `.textValue` property will only reflect the field's (localised) text content. 

* In order to work with the field's underlying value, you must get/set its
`value`, `valueAsDate`, or `valueAsNumber` properties.

* Per the native implementation, polyfilled date fields will only accept
values in the format `yyyy-MM-dd`.

* When submitting an HTML form, the browser will submit the date field's `value`
attribute (i.e. its text content), not the normalized content of the field's
`value` *property*.

    If you don't want that, one potential workaround is to change
    the attribute upon form submission:
    ```js
    el.form.addEventListener('submit', (e)=> el.setAttribute('value', el.value));
    ```

## Contributing

### Local Development
Run `npm start` or, for Cloud9 IDE users: `npm run start-c9`

### Build
Run `npm run build`

### Features
Given the lifecycle of browsers which do not natively support date-inputs, there no plans to add the features below, however if this project were to have a roadmap:
- placeholder currently uses english characters e.g. `dd/mm/yyyy`. This should clearly be language specific.
- support min &amp; max properties and attributes by greying out and preventing click on invalid dates. Add `setCustomValidity` if manually typed date is outside valid range.
- potentially append a sibling input[type=hidden] with the original date-picker name, and append the original date-input id & name with something. this way data going to the server _without ajax_ i.e. simple form submit etc. will be in the `yyyy-mm-dd` form regardless of whether the browser supports date-inputs or not. The same would apply for the original `value` attribute.
- separate out language files and dynamically retrieve only the 1 language file required.

## Thanks
Some words of appreciation for those who have submitted tickets, pull requests,
and new localizations.  The library is more robust and helpful to everyone
because of those who choose to help out.
