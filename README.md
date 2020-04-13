# nodep-date-input-polyfill

Just include this simple script and IE, macOS Safari, and legacy browser versions will support `<input type="date">`, without any dependencies, not even jQuery!

Support dynamically created inputs, so can be used in single page applications.

Forked from [html5-simple-date-input-polyfill](https://www.npmjs.com/package/html5-simple-date-input-polyfill). Continuing as a separate project.

## Demo

[Try it in IE, macOS Safari, and legacy browser versions.](https://brianblakely.github.io/nodep-date-input-polyfill/)

## Install

### NPM

`npm install --save nodep-date-input-polyfill`

Add to your project:

* **Webpack / Rollup / Babel / ES:** `import 'nodep-date-input-polyfill';`

* **Webpack 1 / Browserify:** `require('nodep-date-input-polyfill');`

* **Script Tag:** Copy `nodep-date-input-polyfill.dist.js` from `node_modules` and
include it anywhere in your HTML.


## Features
* **Easily Stylable:** [These are the default styles](https://github.com/brianblakely/nodep-date-input-polyfill/blob/master/nodep-date-input-polyfill.scss),
which you may override with your own.

* **Polyfills `valueAsDate` and `valueAsNumber`:**
[Learn more about these properties.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#property-valueasdate)
They behave as getters and setters.

* **Keyboard Shortcuts:** `Esc` will hide the datepicker. `Up/Down` will
increment/decrement the date by one day.

* **Localization:** Specify the datepicker's locale by setting the
`lang` attribute of the `<input>` or any of its parent nodes.

    `<input type="date" lang="en" />`

    `<body lang="en">`

    The default locale is `en`.

    The rendered date format will automatically adhere to the given locale.

    Currently supported:
    - languages:
Afrikaans, Albanian, Alsatian, Amharic, Arabic, Armenian, Assamese, Azeri, Bashkir, Basque, Belarusian, Bengali, Bosnian, Breton, Bulgarian, Catalan, Chinese - Simplified Chinese - Traditional, Corsican, Croatian, Czech, Danish, Dari, Divehi, Dutch, English, Estonian, Faroese, Filipino, Finnish, French, Frisian, Galician, Georgian, German, Greek, Greenlandic, Gujarati, Hausa, Hebrew, Hindi, Hungarian, Icelandic, Igbo, Indonesian, Inuktitut, Irish, Italian, Japanese, K'iche, Kannada, Kazakh, Khmer, Kinyarwanda, Kiswahili, Konkani, Korean, Kyrgyz, Lao, Latvian, Lithuanian, Lower Sorbian, Luxembourgish, Macedonian (FYROM), Malay, Malayalam, Maltese, Maori, Mapudungun, Marathi, Mohawk, Mongolian, Nepali, Norwegian, Norwegian (Bokmål), Norwegian (Nynorsk), Occitan, Oriya, Pashto, Persian, Polish, Portuguese, Punjabi, Quechua, Romanian, Romansh, Russian, Sami (Inari), Sami (Lule), Sami (Northern), Sami (Skolt), Sami (Southern), Sanskrit, Scottish Gaelic, Serbian, Sesotho sa Leboa, Setswana , Sinhala, Slovak, Slovenian, Spanish, Swedish, Syriac, Tajik, Tamazight, Tamil, Tatar, Telugu, Thai, Tibetan, Turkish, Turkmen, Ukrainian, Upper Sorbian, Urdu, Uyghur, Uzbek, Vietnamese, Welsh, Wolof, Yakut, Yi, Yoruba, isiXhosa, isiZulu
    - locales: af, af-za, am, am-et, ar, ar-ae, ar-bh, ar-dz, ar-eg, ar-iq, ar-jo, ar-kw, ar-lb, ar-ly, ar-ma, ar-om, ar-qa, ar-sa, ar-sy, ar-tn, ar-ye, arn, arn-cl, as, as-in, az, az-cyrl, az-cyrl-az, az-latn, az-latn-az, ba, ba-ru, be, be-by, bg, bg-bg, bn, bn-bd, bn-in, bo, bo-cn, br, br-fr, bs, bs-cyrl, bs-cyrl-ba, bs-latn, bs-latn-ba, ca, ca-es, co, co-fr, cs, cs-cz, cy, cy-gb, da, da-dk, de, de-at, de-ch, de-de, de-li, de-lu, dsb, dsb-de, dv, dv-mv, el, el-gr, en, en-029, en-au, en-bz, en-ca, en-gb, en-ie, en-in, en-jm, en-my, en-nz, en-ph, en-sg, en-tt, en-us, en-za, en-zw, es, es-ar, es-bo, es-cl, es-co, es-cr, es-do, es-ec, es-es, es-gt, es-hn, es-mx, es-ni, es-pa, es-pe, es-pr, es-py, es-sv, es-us, es-uy, es-ve, et, et-ee, eu, eu-es, fa, fa-ir, fi, fi-fi, fil, fil-ph, fo, fo-fo, fr, fr-be, fr-ca, fr-ch, fr-fr, fr-lu, fr-mc, fy, fy-nl, ga, ga-ie, gd, gd-gb, gl, gl-es, gsw, gsw-fr, gu, gu-in, ha, ha-latn, ha-latn-ng, he, he-il, hi, hi-in, hr, hr-ba, hr-hr, hsb, hsb-de, hu, hu-hu, hy, hy-am, id, id-id, ig, ig-ng, ii, ii-cn, is, is-is, it, it-ch, it-it, iu, iu-cans, iu-cans-ca, iu-latn, iu-latn-ca, ja, ja-jp, ka, ka-ge, kk, kk-kz, kl, kl-gl, km, km-kh, kn, kn-in, ko, ko-kr, kok, kok-in, ky, ky-kg, lb, lb-lu, lo, lo-la, lt, lt-lt, lv, lv-lv, mi, mi-nz, mk, mk-mk, ml, ml-in, mn, mn-cyrl, mn-mn, mn-mong, mn-mong-cn, moh, moh-ca, mr, mr-in, ms, ms-bn, ms-my, mt, mt-mt, nb, nb-no, ne, ne-np, nl, nl-be, nl-nl, nn, nn-no, no, nso, nso-za, oc, oc-fr, or, or-in, pa, pa-in, pl, pl-pl, prs, prs-af, ps, ps-af, pt, pt-br, pt-pt, qut, qut-gt, quz, quz-bo, quz-ec, quz-pe, rm, rm-ch, ro, ro-ro, ru, ru-ru, rw, rw-rw, sa, sa-in, sah, sah-ru, se, se-fi, se-no, se-se, si, si-lk, sk, sk-sk, sl, sl-si, sma, sma-no, sma-se, smj, smj-no, smj-se, smn, smn-fi, sms, sms-fi, sq, sq-al, sr, sr-cyrl, sr-cyrl-ba, sr-cyrl-cs, sr-cyrl-me, sr-cyrl-rs, sr-latn, sr-latn-ba, sr-latn-cs, sr-latn-me, sr-latn-rs, sv, sv-fi, sv-se, sw, sw-ke, syr, syr-sy, ta, ta-in, te, te-in, tg, tg-cyrl, tg-cyrl-tj, th, th-th, tk, tk-tm, tn, tn-za, tr, tr-tr, tt, tt-ru, tzm, tzm-latn, tzm-latn-dz, ug, ug-cn, uk, uk-ua, ur, ur-pk, uz, uz-cyrl, uz-cyrl-uz, uz-latn, uz-latn-uz, vi, vi-vn, wo, wo-sn, xh, xh-za, yo, yo-ng, zh, zh-chs, zh-cht, zh-cn, zh-hans, zh-hant, zh-hk, zh-mo, zh-sg, zh-tw, zu, zu-za
## Usage Notes

* `getAttribute` and `setAttribute` will only reflect the field's text content.

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

### Localization
Please submit PRs with new localizations! Open `locales.js` to add more.
File an issue on GitHub if anything is unclear.

## Thanks
Some words of appreciation for those who have submitted tickets, pull requests,
and new localizations.  The library is more robust and helpful to everyone
because of those who choose to help out.
