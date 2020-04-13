import { a as pickerAppliedAttr, d as dateInputIsSupported, F as FindInputsHelper } from './polyfill-date-if-required-dynamic-import-3d89b165.mjs';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "date-input-polyfill {\n  background: #fff;\n  color: #000;\n  text-shadow: none;\n  border: 0;\n  padding: 0;\n  height: auto;\n  width: auto;\n  line-height: normal;\n  border-radius: 0;\n  font-family: sans-serif;\n  font-size: 14px;\n  position: absolute !important;\n  text-align: center;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12);\n  cursor: default;\n  z-index: 1; }\n  date-input-polyfill[data-open=\"false\"] {\n    display: none; }\n  date-input-polyfill[data-open=\"true\"] {\n    display: block; }\n  date-input-polyfill select, date-input-polyfill table, date-input-polyfill th, date-input-polyfill td {\n    background: #fff;\n    color: #000;\n    text-shadow: none;\n    border: 0;\n    padding: 0;\n    height: auto;\n    width: auto;\n    line-height: normal;\n    border-radius: 0;\n    font-family: sans-serif;\n    font-size: 14px;\n    box-shadow: none; }\n  date-input-polyfill select, date-input-polyfill button {\n    border: 0;\n    border-bottom: 1px solid #E0E0E0;\n    height: 24px;\n    vertical-align: top; }\n  date-input-polyfill select {\n    width: 50%; }\n    date-input-polyfill select:first-of-type {\n      border-right: 1px solid #E0E0E0;\n      width: 30%; }\n  date-input-polyfill button {\n    padding: 0;\n    width: 20%;\n    background: #E0E0E0; }\n  date-input-polyfill table {\n    border-collapse: collapse; }\n  date-input-polyfill th, date-input-polyfill td {\n    width: 32px;\n    padding: 4px;\n    text-align: center; }\n  date-input-polyfill td[data-day] {\n    cursor: pointer; }\n    date-input-polyfill td[data-day]:hover {\n      background: #E0E0E0; }\n  date-input-polyfill [data-selected] {\n    font-weight: bold;\n    background: #D8EAF6; }\n\ninput[data-has-picker]::-ms-clear {\n  display: none; }\n";
styleInject(css_248z);

class Picker {
  constructor() {
    // This is a singleton.
    if(Picker.instance) {
      return Picker.instance;
    }

    const passiveOpt = { passive: true };

    this.date = new Date();
    this.input = null;
    this.isOpen = false;

    // The picker element. Unique tag name attempts to protect against
    // generic selectors.
    this.container = document.createElement(`date-input-polyfill`);

    // Add controls.
    // Year picker.
    this.year = document.createElement(`select`);
    Picker.createRangeSelect(
      this.year,
      this.date.getFullYear() - 80,
      this.date.getFullYear() + 20
    );
    this.year.className = `yearSelect`;
    this.year.addEventListener(`change`, ()=> {
      this.date.setYear(this.year.value);
      this.refreshDaysMatrix();
    }, passiveOpt);
    this.container.appendChild(this.year);

    // Month picker.
    this.month = document.createElement(`select`);
    this.month.className = `monthSelect`;
    this.month.addEventListener(`change`, ()=> {
      this.date.setMonth(this.month.value);
      this.refreshDaysMatrix();
    }, passiveOpt);
    this.container.appendChild(this.month);

    // Today button.
    this.today = document.createElement(`button`);
    this.today.textContent = `Today`;
    this.today.addEventListener(`click`, ()=> {
      this.date = new Date();
      this.setInput();
    }, passiveOpt);
    this.container.appendChild(this.today);

    // Setup unchanging DOM for days matrix.
    const daysMatrix = document.createElement(`table`);
    this.daysHead = document.createElement(`thead`);
    this.days = document.createElement(`tbody`);

    // THIS IS THE BIG PART.
    // When the user clicks a day, set that day as the date.
    // Uses event delegation.
    this.days.addEventListener(`click`, e=> {
      const tgt = e.target;

      if(!tgt.hasAttribute(`data-day`)) {
        return false;
      }

      const curSel = this.days.querySelector(`[data-selected]`);
      if(curSel) {
        curSel.removeAttribute(`data-selected`);
      }
      tgt.setAttribute(`data-selected`, '');

      this.date.setDate(parseInt(tgt.textContent));
      this.setInput();
    }, passiveOpt);

    daysMatrix.appendChild(this.daysHead);
    daysMatrix.appendChild(this.days);
    this.container.appendChild(daysMatrix);

    this.hide();
    document.body.appendChild(this.container);

    // Close the picker when clicking outside of a date input or picker.
    document.addEventListener('click', e=> {
      let el = e.target;
      let isPicker = el === this.container;

      while(!isPicker && (el = el.parentNode)) {
        isPicker = el === this.container;
      }

      const attr = e.target.getAttribute('type');
      if (attr !== 'date' && attr !== 'date-polyfill' && !isPicker) {
        this.hide();
      }
    }, passiveOpt);
  }

  // Hide.
  hide() {
    this.container.setAttribute('data-open', this.isOpen = false);
  }

  // Show.
  show() {
    this.container.setAttribute('data-open', this.isOpen = true);
  }

  // Position picker below element. Align to element's left edge.
  goto(element) {
    const rekt = element.getBoundingClientRect();
    this.container.style.top = `${
      rekt.top + rekt.height
      + (document.documentElement.scrollTop || document.body.scrollTop)
    }px`;
    this.container.style.left = `${
      rekt.left
      + (document.documentElement.scrollLeft || document.body.scrollLeft)
    }px`;

    this.show();
  }

  // Initiate I/O with given date input.
  attachTo(input) {
    if(
      input === this.input
      && this.isOpen
    ) {
      return false;
    }

    this.input = input;
    this.sync();
    this.goto(this.input.element);
  }

  // Match picker date with input date.
  sync() {
    if(this.input.element.valueAsDate) {
      this.date = Picker.absoluteDate(this.input.element.valueAsDate);
    } else {
      this.date = new Date();
    }

    this.year.value = this.date.getFullYear();
    this.month.value = this.date.getMonth();
    this.refreshDaysMatrix();
  }

  // Match input date with picker date.
  setInput() {
    this.input.element.value =
      `${
        this.date.getFullYear()
      }-${
        String(this.date.getMonth() + 1).padStart(2,'0')
      }-${
        String(this.date.getDate()).padStart(2,'0')
      }`;

    this.input.element.focus();
    setTimeout(()=> { // IE wouldn't hide, so in a timeout you go.
      this.hide();
    }, 100);

    this.pingInput();
  }

  refreshLocale() {
    if(this.locale === this.input.locale) {
      return false;
    }

    this.locale = this.input.locale;

    const daysHeadHTML = [`<tr>`];
    for(let i = 0, len = this.input.localeText.days.length; i < len; ++i) {
      daysHeadHTML.push(`<th scope="col">${this.input.localeText.days[i]}</th>`);
    }
    this.daysHead.innerHTML = daysHeadHTML.join('');

    Picker.createRangeSelect(
      this.month,
      0,
      11,
      this.input.localeText.months,
      this.date.getMonth()
    );

    this.today.textContent = this.input.localeText.today;
  }

  refreshDaysMatrix() {
    this.refreshLocale();

    // Determine days for this month and year,
    // as well as on which weekdays they lie.
    const year = this.date.getFullYear(); // Get the year (2016).
    const month = this.date.getMonth(); // Get the month number (0-11).
    const startDay = new Date(year, month, 1).getDay(); // First weekday of month (0-6).
    const maxDays = new Date(
      this.date.getFullYear(),
      month + 1,
      0
    ).getDate(); // Get days in month (1-31).

    // The input's current date.
    const selDate = Picker.absoluteDate(this.input.element.valueAsDate) || false;

    // Are we in the input's currently-selected month and year?
    const selMatrix =
      selDate
      && year === selDate.getFullYear()
      && month === selDate.getMonth();

    // Populate days matrix.
    const matrixHTML = [];
    for(let i = 0; i < maxDays + startDay; ++i) {
      // Add a row every 7 days.
      if(i % 7 === 0) {
        matrixHTML.push(`
          ${i !== 0 ? `</tr>` : ''}
          <tr>
        `);
      }

      // Add new column.
      // If no days from this month in this column, it will be empty.
      if(i + 1 <= startDay) {
        matrixHTML.push(`<td></td>`);
        continue;
      }

      // Populate day number.
      const dayNum = i + 1 - startDay;
      const selected = selMatrix && selDate.getDate() === dayNum;

      matrixHTML.push(
        `<td data-day ${selected ? `data-selected` : ''}>
          ${dayNum}
        </td>`
      );
    }

    this.days.innerHTML = matrixHTML.join('');
  }

  pingInput() {
    // Dispatch DOM events to the input.
    let inputEvent;
    let changeEvent;

    // Modern event creation.
    try {
      inputEvent = new Event(`input`);
      changeEvent = new Event(`change`);
    }
    // Old-fashioned way.
    catch(e) {
      inputEvent = document.createEvent(`KeyboardEvent`);
      inputEvent.initEvent(`input`, true, false);
      changeEvent = document.createEvent(`KeyboardEvent`);
      changeEvent.initEvent(`change`, true, false);
    }

    this.input.element.dispatchEvent(inputEvent);
    this.input.element.dispatchEvent(changeEvent);
  }

  static createRangeSelect(theSelect, min, max, namesArray, selectedValue) {
    theSelect.innerHTML = '';

    for(let i = min; i <= max; ++i) {
      const aOption = document.createElement(`option`);
      theSelect.appendChild(aOption);

      const theText = namesArray ? namesArray[i - min] : i;

      aOption.text = theText;
      aOption.value = i;

      if(i === selectedValue) {
        aOption.selected = `selected`;
      }
    }

    return theSelect;
  }

  static absoluteDate(date) {
    return date && new Date(date.getTime() + date.getTimezoneOffset()*60000);
  }
}

Picker.instance = null;

// Localizations for UI text.
function getLocaleFormat(localeNames) {
  const locales = [
    ["D. M. Y",
      '_dsb_dsb-de_hsb_hsb-de_sk_sk-sk_'],
    ["D.M.Y",
      '_az_az-cyrl_az-cyrl-az_az-latn_az-latn-az_ba_ba-ru_be_be-by_bs_bs-cyrl_bs-cyrl-ba_bs-latn_bs-latn-ba_cs_cs-cz_de_de-at_de-ch_de-de_de-li_de-lu_et_et-ee_fi_fi-fi_fr-ch_hy_hy-am_is_is-is_it-ch_ka_ka-ge_kk_kk-kz_ky_ky-kg_mk_mk-mk_nb_nb-no_nn_nn-no_no_ro_ro-ro_ru_ru-ru_se_se-fi_se-no_sl_sl-si_sma-no_smj-no_smn_smn-fi_sms_sms-fi_sr_sr-cyrl_sr-cyrl-ba_sr-cyrl-cs_sr-cyrl-me_sr-cyrl-rs_sr-latn_sr-latn-ba_sr-latn-cs_sr-latn-me_sr-latn-rs_sv-fi_tg_tg-cyrl_tg-cyrl-tj_tk_tk-tm_tr_tr-tr_tt_tt-ru_uk_uk-ua_uz-cyrl_uz-cyrl-uz_'],
    ["D.M.Y 'г.'",
      '_bg_bg-bg_'],
    ["D.M.Y.",
      '_hr_hr-ba_hr-hr_'],
    ["D/M Y",
      '_uz_uz-latn_uz-latn-uz_'],
    ["D/M/Y",
      '_am_am-et_ar_ar-ae_ar-bh_ar-eg_ar-iq_ar-jo_ar-kw_ar-lb_ar-ly_ar-om_ar-qa_ar-sa_ar-sy_ar-ye_br_br-fr_ca_ca-es_co_co-fr_cy_cy-gb_dv_dv-mv_el_el-gr_en-au_en-bz_en-ca_en-gb_en-ie_en-jm_en-my_en-nz_en-sg_en-tt_es_es-ar_es-bo_es-co_es-cr_es-do_es-ec_es-es_es-gt_es-hn_es-mx_es-ni_es-pe_es-pr_es-py_es-sv_es-uy_es-ve_fr_fr-be_fr-fr_fr-lu_fr-mc_ga_ga-ie_gd_gd-gb_gl_gl-es_gsw_gsw-fr_ha_ha-latn_ha-latn-ng_he_he-il_id_id-id_ig_ig-ng_it_it-it_iu_iu-cans_iu-cans-ca_iu-latn_iu-latn-ca_lb_lb-lu_lo_lo-la_mi_mi-nz_ms_ms-bn_ms-my_mt_mt-mt_nl-be_oc_oc-fr_prs_prs-af_ps_ps-af_pt_pt-br_qut_qut-gt_quz_quz-bo_quz-ec_quz-pe_rm_rm-ch_syr_syr-sy_th_th-th_ur_ur-pk_vi_vi-vn_wo_wo-sn_yo_yo-ng_zh-cht_zh-hant_zh-hk_zh-mo_zh-sg_'],
    ["D-M-Y",
      '_ar-dz_ar-ma_arn_arn-cl_ar-tn_as_as-in_bn_bn-bd_bn-in_da_da-dk_en-in_es-cl_fo_fo-fo_fy_fy-nl_gu_gu-in_hi_hi-in_kl_kl-gl_kn_kn-in_kok_kok-in_ml_ml-in_mr_mr-in_nl_nl-nl_or_or-in_pa_pa-in_pt-pt_sa_sa-in_ta_ta-in_te_te-in_tzm_tzm-latn_tzm-latn-dz_'],
    ["M.D.Y",
      '_sah_sah-ru_'],
    ["M/D/Y",
      '_en_en-029_en-ph_en-us_en-zw_es-pa_es-us_fa_fa-ir_fil_fil-ph_moh_moh-ca_ne_ne-np_rw_rw-rw_sw_sw-ke_'],
    ["Y.M.D",
      '_lt_lt-lt_mn_mn-cyrl_mn-mn_'],
    ["Y.M.D.",
      '_hu_hu-hu_lv_lv-lv_'],
    ["Y/M/D",
      '_af_af-za_bo_bo-cn_en-za_eu_eu-es_ii_ii-cn_ja_ja-jp_mn-mong_mn-mong-cn_nso_nso-za_tn_tn-za_xh_xh-za_zh_zh-chs_zh-cn_zh-hans_zh-tw_zu_zu-za_'],
    ["Y-M-D",
      '_fr-ca_km_km-kh_ko_ko-kr_pl_pl-pl_se-se_si_si-lk_sma_sma-se_smj_smj-se_sq_sq-al_sv_sv-se_ug_ug-cn_'],
  ];
  const localeCpy = localeNames.map((l) => l.toLowerCase());
  for (let i = 0; i < localeCpy.length; ++i) {
    const srchStr = '_' + localeCpy[i] + '_';
    const found = locales.find((l) => l[1].includes(srchStr));
    if (found) {
      return { locale: localeCpy[i], format: found[0], parseLocale: parseFromFormat(found[0]) } ;
    }
    const decrSpec = decreaseLocaleSpecificity(localeCpy[i]);
    if (decrSpec) {
      localeCpy.push(decrSpec);
    }
  }
  const format = "Y-M-D";
  return { locale: "en", format, parseLocale: parseFromFormat(format) };
}

function decreaseLocaleSpecificity(localeName) {
  const returnVar = localeName.replace(/-[a-z0-9]+$/, '');
  if (!returnVar || returnVar === localeName) {
    return null;
  }
  return returnVar;
}

function parseFromFormat(format) {
  let yPos = format.indexOf('Y');
  let mPos = format.indexOf('M');
  let dPos;
  // only 3 permutaions in use: DMY, YMD & MDY
  if (yPos < mPos) {
    yPos = 1;
    mPos = 2;
    dPos = 3;
  } else {
    yPos = 3;
    dPos = format.indexOf('D');
    if (dPos < mPos) {
      dPos = 1;
      mPos = 2;
    } else {
      mPos = 1;
      dPos = 2;
    }
  }
  format = format.replace(/\./g, '\\.')
    .replace('Y', '([12]\\d{3})')
    .replace('M', '([01]?\\d)')
    .replace('D', '([0-3]?\\d)');
  const localeDtRx = new RegExp(format);
  return (dtStr) => {
    const dateMatch = localeDtRx.exec(dtStr);
    if (!dateMatch) { return null; }
    const yr = parseInt(dateMatch[yPos], 10);
    const mth = parseInt(dateMatch[mPos], 10) - 1;
    const dt = parseInt(dateMatch[dPos], 10);
    const returnVar = new Date(yr, mth, dt);
    if (returnVar.getFullYear() !== yr || returnVar.getMonth() !== mth || returnVar.getDate() !== dt) {
      return null;
    }
    return returnVar;
  }
}

function getLanguageInfo(localeNames) {
    const languages = getLanguages();
    const fmt = getLocaleFormat(localeNames);
    let language;
    let l = fmt.locale;
    while (!(language = languages[l])) {
        l = decreaseLocaleSpecificity(l);
    }
    if (!language) {
        language = languages['en']; // shouldn't get to here - possibly throw an error?
    }
    return Object.assign(fmt, language);
}

function getLanguages() {
    return {
        ar: { // Arabic
            today: "اليوم",
            days: [
                "الأحد",
                "الإثنين",
                "الثلاثاء",
                "الأربعاء",
                "الخميس",
                "الجمعة",
                "السبت"
            ],
            months: [
                "محرم",
                "صفر",
                "ربيع الأول",
                "ربيع الثاني",
                "جمادى الأولى",
                "جمادى الثانية",
                "رجب",
                "شعبان",
                "رمضان",
                "شوال",
                "ذو القعدة",
                "ذو الحجة"
            ]
        },
        bg: { // Bulgarian
            today: "днес",
            days: [
                "нед",
                "пон",
                "вт",
                "ср",
                "четв",
                "пет",
                "съб"
            ],
            months: [
                "януари",
                "февруари",
                "март",
                "април",
                "май",
                "юни",
                "юли",
                "август",
                "септември",
                "октомври",
                "ноември",
                "декември"
            ]
        },
        ca: { // Catalan
            today: "avui",
            days: [
                "dg.",
                "dl.",
                "dt.",
                "dc.",
                "dj.",
                "dv.",
                "ds."
            ],
            months: [
                "gener",
                "febrer",
                "març",
                "abril",
                "maig",
                "juny",
                "juliol",
                "agost",
                "setembre",
                "octubre",
                "novembre",
                "desembre"
            ]
        },
        cs: { // Czech
            today: "dnes",
            days: [
                "ne",
                "po",
                "út",
                "st",
                "čt",
                "pá",
                "so"
            ],
            months: [
                "leden",
                "únor",
                "březen",
                "duben",
                "květen",
                "červen",
                "červenec",
                "srpen",
                "září",
                "říjen",
                "listopad",
                "prosinec"
            ]
        },
        da: { // Danish
            today: "i dag",
            days: [
                "sø",
                "ma",
                "ti",
                "on",
                "to",
                "fr",
                "lø"
            ],
            months: [
                "januar",
                "februar",
                "marts",
                "april",
                "maj",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "december"
            ]
        },
        de: { // German
            today: "heute",
            days: [
                "So",
                "Mo",
                "Di",
                "Mi",
                "Do",
                "Fr",
                "Sa"
            ],
            months: [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
            ]
        },
        el: { // Greek
            today: "σήμερα",
            days: [
                "Κυρ",
                "Δευ",
                "Τρι",
                "Τετ",
                "Πεμ",
                "Παρ",
                "Σαβ"
            ],
            months: [
                "Ιανουάριος",
                "Φεβρουάριος",
                "Μάρτιος",
                "Απρίλιος",
                "Μάιος",
                "Ιούνιος",
                "Ιούλιος",
                "Αύγουστος",
                "Σεπτέμβριος",
                "Οκτώβριος",
                "Νοέμβριος",
                "Δεκέμβριος"
            ]
        },
        en: { // English
            today: "today",
            days: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]
        },
        es: { // Spanish
            today: "hoy",
            days: [
                "dom",
                "lun",
                "mar",
                "mié",
                "jue",
                "vie",
                "sáb"
            ],
            months: [
                "enero",
                "febrero",
                "marzo",
                "abril",
                "mayo",
                "junio",
                "julio",
                "agosto",
                "septiembre",
                "octubre",
                "noviembre",
                "diciembre"
            ]
        },
        fi: { // Finnish
            today: "tänään",
            days: [
                "su",
                "ma",
                "ti",
                "ke",
                "to",
                "pe",
                "la"
            ],
            months: [
                "tammikuu",
                "helmikuu",
                "maaliskuu",
                "huhtikuu",
                "toukokuu",
                "kesäkuu",
                "heinäkuu",
                "elokuu",
                "syyskuu",
                "lokakuu",
                "marraskuu",
                "joulukuu"
            ]
        },
        fr: { // French
            today: "aujourd'hui",
            days: [
                "dim.",
                "lun.",
                "mar.",
                "mer.",
                "jeu.",
                "ven.",
                "sam."
            ],
            months: [
                "janvier",
                "février",
                "mars",
                "avril",
                "mai",
                "juin",
                "juillet",
                "août",
                "septembre",
                "octobre",
                "novembre",
                "décembre"
            ]
        },
        he: { // Hebrew
            today: "היום",
            days: [
                "יום א",
                "יום ב",
                "יום ג",
                "יום ד",
                "יום ה",
                "יום ו",
                "שבת"
            ],
            months: [
                "ינואר",
                "פברואר",
                "מרץ",
                "אפריל",
                "מאי",
                "יוני",
                "יולי",
                "אוגוסט",
                "ספטמבר",
                "אוקטובר",
                "נובמבר",
                "דצמבר"
            ]
        },
        hu: { // Hungarian
            today: "Ma",
            days: [
                "V",
                "H",
                "K",
                "Sze",
                "Cs",
                "P",
                "Szo"
            ],
            months: [
                "január",
                "február",
                "március",
                "április",
                "május",
                "június",
                "július",
                "augusztus",
                "szeptember",
                "október",
                "november",
                "december"
            ]
        },
        is: { // Icelandic
            today: "Í dag",
            days: [
                "sun.",
                "mán.",
                "þri.",
                "mið.",
                "fim.",
                "fös.",
                "lau."
            ],
            months: [
                "janúar",
                "febrúar",
                "mars",
                "apríl",
                "maí",
                "júní",
                "júlí",
                "ágúst",
                "september",
                "október",
                "nóvember",
                "desember"
            ]
        },
        it: { // Italian
            today: "oggi",
            days: [
                "dom",
                "lun",
                "mar",
                "mer",
                "gio",
                "ven",
                "sab"
            ],
            months: [
                "gennaio",
                "febbraio",
                "marzo",
                "aprile",
                "maggio",
                "giugno",
                "luglio",
                "agosto",
                "settembre",
                "ottobre",
                "novembre",
                "dicembre"
            ]
        },
        ja: { // Japanese
            today: "今日",
            days: [
                "日",
                "月",
                "火",
                "水",
                "木",
                "金",
                "土"
            ],
            months: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
            ]
        },
        ko: { // Korean
            today: "오늘",
            days: [
                "일",
                "월",
                "화",
                "수",
                "목",
                "금",
                "토"
            ],
            months: [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월"
            ]
        },
        nl: { // Dutch
            today: "vandaag",
            days: [
                "zo",
                "ma",
                "di",
                "wo",
                "do",
                "vr",
                "za"
            ],
            months: [
                "januari",
                "februari",
                "maart",
                "april",
                "mei",
                "juni",
                "juli",
                "augustus",
                "september",
                "oktober",
                "november",
                "december"
            ]
        },
        no: { // Norwegian
            today: "i dag",
            days: [
                "sø",
                "ma",
                "ti",
                "on",
                "to",
                "fr",
                "lø"
            ],
            months: [
                "januar",
                "februar",
                "mars",
                "april",
                "mai",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "desember"
            ]
        },
        pl: { // Polish
            today: "dzisiaj",
            days: [
                "N",
                "Pn",
                "Wt",
                "Śr",
                "Cz",
                "Pt",
                "So"
            ],
            months: [
                "styczeń",
                "luty",
                "marzec",
                "kwiecień",
                "maj",
                "czerwiec",
                "lipiec",
                "sierpień",
                "wrzesień",
                "październik",
                "listopad",
                "grudzień"
            ]
        },
        pt: { // Portuguese
            today: "hoje",
            days: [
                "dom",
                "seg",
                "ter",
                "qua",
                "qui",
                "sex",
                "sáb"
            ],
            months: [
                "janeiro",
                "fevereiro",
                "março",
                "abril",
                "maio",
                "junho",
                "julho",
                "agosto",
                "setembro",
                "outubro",
                "novembro",
                "dezembro"
            ]
        },
        rm: { // Romansh
            today: "oz",
            days: [
                "du",
                "gli",
                "ma",
                "me",
                "gie",
                "ve",
                "so"
            ],
            months: [
                "schaner",
                "favrer",
                "mars",
                "avrigl",
                "matg",
                "zercladur",
                "fanadur",
                "avust",
                "settember",
                "october",
                "november",
                "december"
            ]
        },
        ro: { // Romanian
            today: "astăzi",
            days: [
                "D",
                "L",
                "Ma",
                "Mi",
                "J",
                "V",
                "S"
            ],
            months: [
                "ianuarie",
                "februarie",
                "martie",
                "aprilie",
                "mai",
                "iunie",
                "iulie",
                "august",
                "septembrie",
                "octombrie",
                "noiembrie",
                "decembrie"
            ]
        },
        ru: { // Russian
            today: "Cегодня",
            days: [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            months: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ]
        },
        hr: { // Croatian
            today: "danas",
            days: [
                "ned",
                "pon",
                "uto",
                "sri",
                "čet",
                "pet",
                "sub"
            ],
            months: [
                "siječanj",
                "veljača",
                "ožujak",
                "travanj",
                "svibanj",
                "lipanj",
                "srpanj",
                "kolovoz",
                "rujan",
                "listopad",
                "studeni",
                "prosinac"
            ]
        },
        sk: { // Slovak
            today: "dnes",
            days: [
                "ne",
                "po",
                "ut",
                "st",
                "št",
                "pi",
                "so"
            ],
            months: [
                "január",
                "február",
                "marec",
                "apríl",
                "máj",
                "jún",
                "júl",
                "august",
                "september",
                "október",
                "november",
                "december"
            ]
        },
        sq: { // Albanian
            today: "sot",
            days: [
                "Die",
                "Hën",
                "Mar",
                "Mër",
                "Enj",
                "Pre",
                "Sht"
            ],
            months: [
                "janar",
                "shkurt",
                "mars",
                "prill",
                "maj",
                "qershor",
                "korrik",
                "gusht",
                "shtator",
                "tetor",
                "nëntor",
                "dhjetor"
            ]
        },
        sv: { // Swedish
            today: "i dag",
            days: [
                "sö",
                "må",
                "ti",
                "on",
                "to",
                "fr",
                "lö"
            ],
            months: [
                "januari",
                "februari",
                "mars",
                "april",
                "maj",
                "juni",
                "juli",
                "augusti",
                "september",
                "oktober",
                "november",
                "december"
            ]
        },
        th: { // Thai
            today: "ในวันนี้",
            days: [
                "อา.",
                "จ.",
                "อ.",
                "พ.",
                "พฤ.",
                "ศ.",
                "ส."
            ],
            months: [
                "มกราคม",
                "กุมภาพันธ์",
                "มีนาคม",
                "เมษายน",
                "พฤษภาคม",
                "มิถุนายน",
                "กรกฎาคม",
                "สิงหาคม",
                "กันยายน",
                "ตุลาคม",
                "พฤศจิกายน",
                "ธันวาคม"
            ]
        },
        tr: { // Turkish
            today: "bugün",
            days: [
                "Paz",
                "Pzt",
                "Sal",
                "Çar",
                "Per",
                "Cum",
                "Cmt"
            ],
            months: [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Ağustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık"
            ]
        },
        ur: { // Urdu
            today: "آج",
            days: [
                "اتوار",
                "پير",
                "منگل",
                "بدھ",
                "جمعرات",
                "جمعه",
                "هفته"
            ],
            months: [
                "جنوری",
                "فروری",
                "مارچ",
                "اپریل",
                "مئی",
                "جون",
                "جولائی",
                "اگست",
                "ستمبر",
                "اکتوبر",
                "نومبر",
                "دسمبر"
            ]
        },
        id: { // Indonesian
            today: "hari ini",
            days: [
                "Minggu",
                "Sen",
                "Sel",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu"
            ],
            months: [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "Nopember",
                "Desember"
            ]
        },
        uk: { // Ukrainian
            today: "сьогодні",
            days: [
                "Нд",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            months: [
                "Січень",
                "Лютий",
                "Березень",
                "Квітень",
                "Травень",
                "Червень",
                "Липень",
                "Серпень",
                "Вересень",
                "Жовтень",
                "Листопад",
                "Грудень"
            ]
        },
        be: { // Belarusian
            today: "сёння",
            days: [
                "нд",
                "пн",
                "аў",
                "ср",
                "чц",
                "пт",
                "сб"
            ],
            months: [
                "Студзень",
                "Люты",
                "Сакавік",
                "Красавік",
                "Май",
                "Чэрвень",
                "Ліпень",
                "Жнівень",
                "Верасень",
                "Кастрычнік",
                "Лістапад",
                "Снежань"
            ]
        },
        sl: { // Slovenian
            today: "danes",
            days: [
                "ned",
                "pon",
                "tor",
                "sre",
                "čet",
                "pet",
                "sob"
            ],
            months: [
                "januar",
                "februar",
                "marec",
                "april",
                "maj",
                "junij",
                "julij",
                "avgust",
                "september",
                "oktober",
                "november",
                "december"
            ]
        },
        et: { // Estonian
            today: "täna",
            days: [
                "P",
                "E",
                "T",
                "K",
                "N",
                "R",
                "L"
            ],
            months: [
                "jaanuar",
                "veebruar",
                "märts",
                "aprill",
                "mai",
                "juuni",
                "juuli",
                "august",
                "september",
                "oktoober",
                "november",
                "detsember"
            ]
        },
        lv: { // Latvian
            today: "šodien",
            days: [
                "sv",
                "pr",
                "ot",
                "tr",
                "ce",
                "pk",
                "se"
            ],
            months: [
                "janvāris",
                "februāris",
                "marts",
                "aprīlis",
                "maijs",
                "jūnijs",
                "jūlijs",
                "augusts",
                "septembris",
                "oktobris",
                "novembris",
                "decembris"
            ]
        },
        lt: { // Lithuanian
            today: "šiandien",
            days: [
                "Sk",
                "Pr",
                "An",
                "Tr",
                "Kt",
                "Pn",
                "Št"
            ],
            months: [
                "sausis",
                "vasaris",
                "kovas",
                "balandis",
                "gegužė",
                "birželis",
                "liepa",
                "rugpjūtis",
                "rugsėjis",
                "spalis",
                "lapkritis",
                "gruodis"
            ]
        },
        tg: { // Tajik
            today: "имрӯз",
            days: [
                "Яш",
                "Дш",
                "Сш",
                "Чш",
                "Пш",
                "Ҷм",
                "Шн"
            ],
            months: [
                "Январ",
                "Феврал",
                "Март",
                "Апрел",
                "Май",
                "Июн",
                "Июл",
                "Август",
                "Сентябр",
                "Октябр",
                "Ноябр",
                "Декабр"
            ]
        },
        fa: { // Persian
            today: "امروز",
            days: [
                "الأحد",
                "الإثنين",
                "الثلاثاء",
                "الأربعاء",
                "الخميس",
                "الجمعة",
                "السبت"
            ],
            months: [
                "جانفييه",
                "فيفرييه",
                "مارس",
                "أفريل",
                "مي",
                "جوان",
                "جوييه",
                "أوت",
                "سبتمبر",
                "اكتوبر",
                "نوفمبر",
                "ديسمبر"
            ]
        },
        vi: { // Vietnamese
            today: "hôm nay",
            days: [
                "CN",
                "Hai",
                "Ba",
                "Tư",
                "Năm",
                "Sáu",
                "Bảy"
            ],
            months: [
                "Tháng Giêng",
                "Tháng Hai",
                "Tháng Ba",
                "Tháng Tư",
                "Tháng Năm",
                "Tháng Sáu",
                "Tháng Bảy",
                "Tháng Tám",
                "Tháng Chín",
                "Tháng Mười",
                "Tháng Mười Một",
                "Tháng Mười Hai"
            ]
        },
        hy: { // Armenian
            today: "այսօր",
            days: [
                "Կիր",
                "Երկ",
                "Երք",
                "Չրք",
                "Հնգ",
                "ՈՒր",
                "Շբթ"
            ],
            months: [
                "Հունվար",
                "Փետրվար",
                "Մարտ",
                "Ապրիլ",
                "Մայիս",
                "Հունիս",
                "Հուլիս",
                "Օգոստոս",
                "Սեպտեմբեր",
                "Հոկտեմբեր",
                "Նոյեմբեր",
                "Դեկտեմբեր"
            ]
        },
        az: { // Azeri
            today: "bugün",
            days: [
                "B",
                "Be",
                "Ça",
                "Ç",
                "Ca",
                "C",
                "Ş"
            ],
            months: [
                "Yanvar",
                "Fevral",
                "Mart",
                "Aprel",
                "May",
                "İyun",
                "İyul",
                "Avgust",
                "Sentyabr",
                "Oktyabr",
                "Noyabr",
                "Dekabr"
            ]
        },
        eu: { // Basque
            today: "gaur",
            days: [
                "ig.",
                "al.",
                "as.",
                "az.",
                "og.",
                "or.",
                "lr."
            ],
            months: [
                "urtarrila",
                "otsaila",
                "martxoa",
                "apirila",
                "maiatza",
                "ekaina",
                "uztaila",
                "abuztua",
                "iraila",
                "urria",
                "azaroa",
                "abendua"
            ]
        },
        hsb: { // Upper Sorbian
            today: "dźensa",
            days: [
                "nje",
                "pón",
                "wut",
                "srj",
                "štw",
                "pja",
                "sob"
            ],
            months: [
                "januar",
                "februar",
                "měrc",
                "apryl",
                "meja",
                "junij",
                "julij",
                "awgust",
                "september",
                "oktober",
                "nowember",
                "december"
            ]
        },
        mk: { // Macedonian (FYROM)
            today: "денес",
            days: [
                "нед",
                "пон",
                "втр",
                "срд",
                "чет",
                "пет",
                "саб"
            ],
            months: [
                "јануари",
                "февруари",
                "март",
                "април",
                "мај",
                "јуни",
                "јули",
                "август",
                "септември",
                "октомври",
                "ноември",
                "декември"
            ]
        },
        tn: { // Setswana
            today: "Gompieno",
            days: [
                "Ltp.",
                "Mos.",
                "Lbd.",
                "Lbr.",
                "Lbn.",
                "Lbt.",
                "Lmt."
            ],
            months: [
                "Ferikgong",
                "Tlhakole",
                "Mopitloe",
                "Moranang",
                "Motsheganong",
                "Seetebosigo",
                "Phukwi",
                "Phatwe",
                "Lwetse",
                "Diphalane",
                "Ngwanatsele",
                "Sedimothole"
            ]
        },
        xh: { // isiXhosa
            today: "namhlanje",
            days: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            months: [
                "Mqungu",
                "Mdumba",
                "Kwindla",
                "Tshazimpuzi",
                "Canzibe",
                "Silimela",
                "Khala",
                "Thupha",
                "Msintsi",
                "Dwarha",
                "Nkanga",
                "Mnga"
            ]
        },
        zu: { // isiZulu
            today: "namhlanje",
            days: [
                "Son.",
                "Mso.",
                "Bi.",
                "Tha.",
                "Ne.",
                "Hla.",
                "Mgq."
            ],
            months: [
                "uMasingana",
                "uNhlolanja",
                "uNdasa",
                "uMbaso",
                "uNhlaba",
                "uNhlangulana",
                "uNtulikazi",
                "uNcwaba",
                "uMandulo",
                "uMfumfu",
                "uLwezi",
                "uZibandlela"
            ]
        },
        af: { // Afrikaans
            today: "vandag",
            days: [
                "Son",
                "Maan",
                "Dins",
                "Woen",
                "Dond",
                "Vry",
                "Sat"
            ],
            months: [
                "Januarie",
                "Februarie",
                "Maart",
                "April",
                "Mei",
                "Junie",
                "Julie",
                "Augustus",
                "September",
                "Oktober",
                "November",
                "Desember"
            ]
        },
        ka: { // Georgian
            today: "დღეს",
            days: [
                "კვირა",
                "ორშაბათი",
                "სამშაბათი",
                "ოთხშაბათი",
                "ხუთშაბათი",
                "პარასკევი",
                "შაბათი"
            ],
            months: [
                "იანვარი",
                "თებერვალი",
                "მარტი",
                "აპრილი",
                "მაისი",
                "ივნისი",
                "ივლისი",
                "აგვისტო",
                "სექტემბერი",
                "ოქტომბერი",
                "ნოემბერი",
                "დეკემბერი"
            ]
        },
        fo: { // Faroese
            today: "í dag",
            days: [
                "sun",
                "mán",
                "týs",
                "mik",
                "hós",
                "frí",
                "leyg"
            ],
            months: [
                "januar",
                "februar",
                "mars",
                "apríl",
                "mai",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "desember"
            ]
        },
        hi: { // Hindi
            today: "आज",
            days: [
                "रवि.",
                "सोम.",
                "मंगल.",
                "बुध.",
                "गुरु.",
                "शुक्र.",
                "शनि."
            ],
            months: [
                "जनवरी",
                "फरवरी",
                "मार्च",
                "अप्रैल",
                "मई",
                "जून",
                "जुलाई",
                "अगस्त",
                "सितम्बर",
                "अक्तूबर",
                "नवम्बर",
                "दिसम्बर"
            ]
        },
        mt: { // Maltese
            today: "illum",
            days: [
                "Ħad",
                "Tne",
                "Tli",
                "Erb",
                "Ħam",
                "Ġim",
                "Sib"
            ],
            months: [
                "Jannar",
                "Frar",
                "Marzu",
                "April",
                "Mejju",
                "Ġunju",
                "Lulju",
                "Awissu",
                "Settembru",
                "Ottubru",
                "Novembru",
                "Diċembru"
            ]
        },
        se: { // Sami (Northern)
            today: "odne",
            days: [
                "sotn",
                "vuos",
                "maŋ",
                "gask",
                "duor",
                "bear",
                "láv"
            ],
            months: [
                "ođđajagemánnu",
                "guovvamánnu",
                "njukčamánnu",
                "cuoŋománnu",
                "miessemánnu",
                "geassemánnu",
                "suoidnemánnu",
                "borgemánnu",
                "čakčamánnu",
                "golggotmánnu",
                "skábmamánnu",
                "juovlamánnu"
            ]
        },
        ga: { // Irish
            today: "inniu",
            days: [
                "Domh",
                "Luan",
                "Máir",
                "Céad",
                "Déar",
                "Aoi",
                "Sath"
            ],
            months: [
                "Eanáir",
                "Feabhra",
                "Márta",
                "Aibreán",
                "Bealtaine",
                "Meitheamh",
                "Iúil",
                "Lúnasa",
                "Meán Fómhair",
                "Deireadh Fómhair",
                "Samhain",
                "Nollaig"
            ]
        },
        ms: { // Malay
            today: "hari ini",
            days: [
                "Ahad",
                "Isnin",
                "Sel",
                "Rabu",
                "Khamis",
                "Jumaat",
                "Sabtu"
            ],
            months: [
                "Januari",
                "Februari",
                "Mac",
                "April",
                "Mei",
                "Jun",
                "Julai",
                "Ogos",
                "September",
                "Oktober",
                "November",
                "Disember"
            ]
        },
        kk: { // Kazakh
            today: "бүгін",
            days: [
                "Жк",
                "Дс",
                "Сс",
                "Ср",
                "Бс",
                "Жм",
                "Сн"
            ],
            months: [
                "қаңтар",
                "ақпан",
                "наурыз",
                "сәуір",
                "мамыр",
                "маусым",
                "шілде",
                "тамыз",
                "қыркүйек",
                "қазан",
                "қараша",
                "желтоқсан"
            ]
        },
        ky: { // Kyrgyz
            today: "бүгүн",
            days: [
                "Жш",
                "Дш",
                "Шш",
                "Шр",
                "Бш",
                "Жм",
                "Иш"
            ],
            months: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ]
        },
        sw: { // Kiswahili
            today: "leo",
            days: [
                "Jumap.",
                "Jumat.",
                "Juman.",
                "Jumat.",
                "Alh.",
                "Iju.",
                "Jumam."
            ],
            months: [
                "Januari",
                "Februari",
                "Machi",
                "Aprili",
                "Mei",
                "Juni",
                "Julai",
                "Agosti",
                "Septemba",
                "Oktoba",
                "Novemba",
                "Decemba"
            ]
        },
        tk: { // Turkmen
            today: "bugün",
            days: [
                "Db",
                "Sb",
                "Çb",
                "Pb",
                "An",
                "Şb",
                "Ýb"
            ],
            months: [
                "Ýanwar",
                "Fewral",
                "Mart",
                "Aprel",
                "Maý",
                "lýun",
                "lýul",
                "Awgust",
                "Sentýabr",
                "Oktýabr",
                "Noýabr",
                "Dekabr"
            ]
        },
        uz: { // Uzbek
            today: "Bugun",
            days: [
                "yak.",
                "dsh.",
                "sesh.",
                "chr.",
                "psh.",
                "jm.",
                "sh."
            ],
            months: [
                "yanvar",
                "fevral",
                "mart",
                "aprel",
                "may",
                "iyun",
                "iyul",
                "avgust",
                "sentyabr",
                "oktyabr",
                "noyabr",
                "dekabr"
            ]
        },
        tt: { // Tatar
            today: "бүген",
            days: [
                "Якш",
                "Дүш",
                "Сиш",
                "Чәрш",
                "Пәнҗ",
                "Җом",
                "Шим"
            ],
            months: [
                "Гыйнвар",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ]
        },
        bn: { // Bengali
            today: "আজ",
            days: [
                "রবি.",
                "সোম.",
                "মঙ্গল.",
                "বুধ.",
                "বৃহস্পতি.",
                "শুক্র.",
                "শনি."
            ],
            months: [
                "জানুয়ারী",
                "ফেব্রুয়ারী",
                "মার্চ",
                "এপ্রিল",
                "মে",
                "জুন",
                "জুলাই",
                "আগস্ট",
                "সেপ্টেম্বর",
                "অক্টোবর",
                "নভেম্বর",
                "ডিসেম্বর"
            ]
        },
        pa: { // Punjabi
            today: "ਅੱਜ",
            days: [
                "ਐਤ.",
                "ਸੋਮ.",
                "ਮੰਗਲ.",
                "ਬੁੱਧ.",
                "ਵੀਰ.",
                "ਸ਼ੁਕਰ.",
                "ਸ਼ਨਿੱਚਰ."
            ],
            months: [
                "ਜਨਵਰੀ",
                "ਫ਼ਰਵਰੀ",
                "ਮਾਰਚ",
                "ਅਪ੍ਰੈਲ",
                "ਮਈ",
                "ਜੂਨ",
                "ਜੁਲਾਈ",
                "ਅਗਸਤ",
                "ਸਤੰਬਰ",
                "ਅਕਤੂਬਰ",
                "ਨਵੰਬਰ",
                "ਦਸੰਬਰ"
            ]
        },
        gu: { // Gujarati
            today: "આજે",
            days: [
                "રવિ",
                "સોમ",
                "મંગળ",
                "બુધ",
                "ગુરુ",
                "શુક્ર",
                "શનિ"
            ],
            months: [
                "જાન્યુઆરી",
                "ફેબ્રુઆરી",
                "માર્ચ",
                "એપ્રિલ",
                "મે",
                "જૂન",
                "જુલાઈ",
                "ઑગસ્ટ",
                "સપ્ટેમ્બર",
                "ઑક્ટ્બર",
                "નવેમ્બર",
                "ડિસેમ્બર"
            ]
        },
        or: { // Oriya
            today: "ଆଜି",
            days: [
                "ରବି.",
                "ସୋମ.",
                "ମଙ୍ଗଳ.",
                "ବୁଧ.",
                "ଗୁରୁ.",
                "ଶୁକ୍ର.",
                "ଶନି."
            ],
            months: [
                "ଜାନୁୟାରୀ",
                "ଫ୍ରେବୃୟାରୀ",
                "ମାର୍ଚ୍ଚ",
                "ଏପ୍ରିଲ୍‌",
                "ମେ",
                "ଜୁନ୍‌",
                "ଜୁଲାଇ",
                "ଅଗଷ୍ଟ",
                "ସେପ୍ଟେମ୍ବର",
                "ଅକ୍ଟୋବର",
                "ନଭେମ୍ବର",
                "(ଡିସେମ୍ବର"
            ]
        },
        ta: { // Tamil
            today: "இன்று",
            days: [
                "ஞாயிறு",
                "திங்கள்",
                "செவ்வாய்",
                "புதன்",
                "வியாழன்",
                "வெள்ளி",
                "சனி"
            ],
            months: [
                "ஜனவரி",
                "பிப்ரவரி",
                "மார்ச்",
                "ஏப்ரல்",
                "மே",
                "ஜூன்",
                "ஜூலை",
                "ஆகஸ்ட்",
                "செப்டம்பர்",
                "அக்டோபர்",
                "நவம்பர்",
                "டிசம்பர்"
            ]
        },
        te: { // Telugu
            today: "నేడు",
            days: [
                "ఆది.",
                "సోమ.",
                "మంగళ.",
                "బుధ.",
                "గురు.",
                "శుక్ర.",
                "శని."
            ],
            months: [
                "జనవరి",
                "ఫిబ్రవరి",
                "మార్చి",
                "ఏప్రిల్",
                "మే",
                "జూన్",
                "జూలై",
                "ఆగస్టు",
                "సెప్టెంబర్",
                "అక్టోబర్",
                "నవంబర్",
                "డిసెంబర్"
            ]
        },
        kn: { // Kannada
            today: "ಇಂದು",
            days: [
                "ಭಾನು.",
                "ಸೋಮ.",
                "ಮಂಗಳ.",
                "ಬುಧ.",
                "ಗುರು.",
                "ಶುಕ್ರ.",
                "ಶನಿ."
            ],
            months: [
                "ಜನವರಿ",
                "ಫೆಬ್ರವರಿ",
                "ಮಾರ್ಚ್",
                "ಎಪ್ರಿಲ್",
                "ಮೇ",
                "ಜೂನ್",
                "ಜುಲೈ",
                "ಆಗಸ್ಟ್",
                "ಸೆಪ್ಟಂಬರ್",
                "ಅಕ್ಟೋಬರ್",
                "ನವೆಂಬರ್",
                "ಡಿಸೆಂಬರ್"
            ]
        },
        ml: { // Malayalam
            today: "ഇന്ന്",
            days: [
                "ഞായർ.",
                "തിങ്കൾ.",
                "ചൊവ്വ.",
                "ബുധൻ.",
                "വ്യാഴം.",
                "വെള്ളി.",
                "ശനി."
            ],
            months: [
                "ജനുവരി",
                "ഫെബ്റുവരി",
                "മാറ്ച്ച്",
                "ഏപ്റില്",
                "മെയ്",
                "ജൂണ്",
                "ജൂലൈ",
                "ഓഗസ്ററ്",
                "സെപ്ററംബറ്",
                "ഒക്ടോബറ്",
                "നവംബറ്",
                "ഡിസംബറ്"
            ]
        },
        as: { // Assamese
            today: "আজি",
            days: [
                "সোম.",
                "মঙ্গল.",
                "বুধ.",
                "বৃহ.",
                "শুক্র.",
                "শনি.",
                "ৰবি."
            ],
            months: [
                "জানুৱাৰী",
                "ফেব্রুৱাৰী",
                "মার্চ",
                "এপ্রিল",
                "মে",
                "জুন",
                "জুলাই",
                "আগষ্ট",
                "চেপ্টেম্বর",
                "অক্টোবর",
                "নবেম্বর",
                "ডিচেম্বর"
            ]
        },
        mr: { // Marathi
            today: "आज",
            days: [
                "रवि.",
                "सोम.",
                "मंगळ.",
                "बुध.",
                "गुरु.",
                "शुक्र.",
                "शनि."
            ],
            months: [
                "जानेवारी",
                "फेब्रुवारी",
                "मार्च",
                "एप्रिल",
                "मे",
                "जून",
                "जुलै",
                "ऑगस्ट",
                "सप्टेंबर",
                "ऑक्टोबर",
                "नोव्हेंबर",
                "डिसेंबर"
            ]
        },
        sa: { // Sanskrit
            today: "अद्य",
            days: [
                "रविवासरः",
                "सोमवासरः",
                "मङ्गलवासरः",
                "बुधवासरः",
                "गुरुवासरः",
                "शुक्रवासरः",
                "शनिवासरः"
            ],
            months: [
                "जनवरी",
                "फरवरी",
                "मार्च",
                "अप्रैल",
                "मई",
                "जून",
                "जुलाई",
                "अगस्त",
                "सितम्बर",
                "अक्तूबर",
                "नवम्बर",
                "दिसम्बर"
            ]
        },
        mn: { // Mongolian
            today: "өнөөдөр",
            days: [
                "Ня",
                "Да",
                "Мя",
                "Лх",
                "Пү",
                "Ба",
                "Бя"
            ],
            months: [
                "1 дүгээр сар",
                "2 дугаар сар",
                "3 дугаар сар",
                "4 дүгээр сар",
                "5 дугаар сар",
                "6 дугаар сар",
                "7 дугаар сар",
                "8 дугаар сар",
                "9 дүгээр сар",
                "10 дугаар сар",
                "11 дүгээр сар",
                "12 дугаар сар"
            ]
        },
        bo: { // Tibetan
            today: "ད་རིང",
            days: [
                "ཉི་མ།",
                "ཟླ་བ།",
                "མིག་དམར།",
                "ལྷག་པ།",
                "ཕུར་བུ།",
                "པ་སངས།",
                "སྤེན་པ།"
            ],
            months: [
                "སྤྱི་ཟླ་དང་པོ།",
                "སྤྱི་ཟླ་གཉིས་པ།",
                "སྤྱི་ཟླ་གསུམ་པ།",
                "སྤྱི་ཟླ་བཞི་པ།",
                "སྤྱི་ཟླ་ལྔ་པ།",
                "སྤྱི་ཟླ་དྲུག་པ།",
                "སྤྱི་ཟླ་བདུན་པ།",
                "སྤྱི་ཟླ་བརྒྱད་པ།",
                "སྤྱི་ཟླ་དགུ་པ།",
                "སྤྱི་ཟླ་བཅུ་པོ།",
                "སྤྱི་ཟླ་བཅུ་གཅིག་པ།",
                "སྤྱི་ཟླ་བཅུ་གཉིས་པ།"
            ]
        },
        cy: { // Welsh
            today: "heddiw",
            days: [
                "Sul",
                "Llun",
                "Maw",
                "Mer",
                "Iau",
                "Gwe",
                "Sad"
            ],
            months: [
                "Ionawr",
                "Chwefror",
                "Mawrth",
                "Ebrill",
                "Mai",
                "Mehefin",
                "Gorffennaf",
                "Awst",
                "Medi",
                "Hydref",
                "Tachwedd",
                "Rhagfyr"
            ]
        },
        km: { // Khmer
            today: "ថ្ងៃនេះ",
            days: [
                "អាទិ.",
                "ច.",
                "អ.",
                "ពុ",
                "ព្រហ.",
                "សុ.",
                "ស."
            ],
            months: [
                "មករា",
                "កុម្ភៈ",
                "មិនា",
                "មេសា",
                "ឧសភា",
                "មិថុនា",
                "កក្កដា",
                "សីហា",
                "កញ្ញា",
                "តុលា",
                "វិច្ឆិកា",
                "ធ្នូ"
            ]
        },
        lo: { // Lao
            today: "ໃນມື້ນີ້",
            days: [
                "ອາທິດ",
                "ຈັນ",
                "ອັງຄານ",
                "ພຸດ",
                "ພະຫັດ",
                "ສຸກ",
                "ເສົາ"
            ],
            months: [
                "ມັງກອນ",
                "ກຸມພາ",
                "ມີນາ",
                "ເມສາ",
                "ພຶດສະພາ",
                "ມິຖຸນາ",
                "ກໍລະກົດ",
                "ສິງຫາ",
                "ກັນຍາ",
                "ຕຸລາ",
                "ພະຈິກ",
                "ທັນວາ"
            ]
        },
        gl: { // Galician
            today: "hoxe",
            days: [
                "dom",
                "luns",
                "mar",
                "mér",
                "xov",
                "ven",
                "sáb"
            ],
            months: [
                "xaneiro",
                "febreiro",
                "marzo",
                "abril",
                "maio",
                "xuño",
                "xullo",
                "agosto",
                "setembro",
                "outubro",
                "novembro",
                "decembro"
            ]
        },
        kok: { // Konkani
            today: "आजि",
            days: [
                "आय.",
                "सोम.",
                "मंगळ.",
                "बुध.",
                "बिरे.",
                "सुक्र.",
                "शेन."
            ],
            months: [
                "जानेवारी",
                "फेब्रुवारी",
                "मार्च",
                "एप्रिल",
                "मे",
                "जून",
                "जुलै",
                "ऑगस्ट",
                "सप्टेंबर",
                "ऑक्टोबर",
                "नोवेम्बर",
                "डिसेंबर"
            ]
        },
        syr: { // Syriac
            today: "ܝܘܡܐ",
            days: [
                "܏ܐ ܏ܒܫ",
                "܏ܒ ܏ܒܫ",
                "܏ܓ ܏ܒܫ",
                "܏ܕ ܏ܒܫ",
                "܏ܗ ܏ܒܫ",
                "܏ܥܪܘܒ",
                "܏ܫܒ"
            ],
            months: [
                "ܟܢܘܢ ܐܚܪܝ",
                "ܫܒܛ",
                "ܐܕܪ",
                "ܢܝܣܢ",
                "ܐܝܪ",
                "ܚܙܝܪܢ",
                "ܬܡܘܙ",
                "ܐܒ",
                "ܐܝܠܘܠ",
                "ܬܫܪܝ ܩܕܝܡ",
                "ܬܫܪܝ ܐܚܪܝ",
                "ܟܢܘܢ ܩܕܝܡ"
            ]
        },
        si: { // Sinhala
            today: "අද",
            days: [
                "ඉරිදා",
                "සඳුදා",
                "කුජදා",
                "බුදදා",
                "ගුරුදා",
                "කිවිදා",
                "ශනිදා"
            ],
            months: [
                "ජනවාරි",
                "පෙබරවාරි",
                "මාර්තු",
                "අ‌ප්‍රේල්",
                "මැයි",
                "ජූනි",
                "ජූලි",
                "අ‌ගෝස්තු",
                "සැප්තැම්බර්",
                "ඔක්තෝබර්",
                "නොවැම්බර්",
                "දෙසැම්බර්"
            ]
        },
        iu: { // Inuktitut
            today: "ullumi",
            days: [
                "Nat",
                "Nag",
                "Aip",
                "Pi",
                "Sit",
                "Tal",
                "Siv"
            ],
            months: [
                "Jaannuari",
                "Viivvuari",
                "Maatsi",
                "Iipuri",
                "Mai",
                "Juuni",
                "Julai",
                "Aaggiisi",
                "Sitipiri",
                "Utupiri",
                "Nuvipiri",
                "Tisipiri"
            ]
        },
        am: { // Amharic
            today: "ዛሬ",
            days: [
                "እሑድ",
                "ሰኞ",
                "ማክሰ",
                "ረቡዕ",
                "ሐሙስ",
                "ዓርብ",
                "ቅዳሜ"
            ],
            months: [
                "ጃንዩወሪ",
                "ፌብሩወሪ",
                "ማርች",
                "ኤፕረል",
                "ሜይ",
                "ጁን",
                "ጁላይ",
                "ኦገስት",
                "ሴፕቴምበር",
                "ኦክተውበር",
                "ኖቬምበር",
                "ዲሴምበር"
            ]
        },
        tzm: { // Tamazight
            today: "assa",
            days: [
                "Ace",
                "Ari",
                "Ara",
                "Aha",
                "Amh",
                "Sem",
                "Sed"
            ],
            months: [
                "Yenayer",
                "Furar",
                "Maghres",
                "Yebrir",
                "Mayu",
                "Yunyu",
                "Yulyu",
                "Ghuct",
                "Cutenber",
                "Ktuber",
                "Wambir",
                "Dujanbir"
            ]
        },
        ne: { // Nepali
            today: "आज",
            days: [
                "आइत",
                "सोम",
                "मङ्गल",
                "बुध",
                "बिही",
                "शुक्र",
                "शनि"
            ],
            months: [
                "जनवरी",
                "फेब्रुअरी",
                "मार्च",
                "अप्रिल",
                "मे",
                "जून",
                "जुलाई",
                "अगस्त",
                "सेप्टेम्बर",
                "अक्टोबर",
                "नोभेम्बर",
                "डिसेम्बर"
            ]
        },
        fy: { // Frisian
            today: "hjoed",
            days: [
                "Sn",
                "Mo",
                "Ti",
                "Wo",
                "To",
                "Fr",
                "Sn"
            ],
            months: [
                "jannewaris",
                "febrewaris",
                "maart",
                "april",
                "maaie",
                "juny",
                "july",
                "augustus",
                "septimber",
                "oktober",
                "novimber",
                "desimber"
            ]
        },
        ps: { // Pashto
            today: "نن ورځ",
            days: [
                "الأحد",
                "الإثنين",
                "الثلاثاء",
                "الأربعاء",
                "الخميس",
                "الجمعة",
                "السبت"
            ],
            months: [
                "محرم",
                "صفر",
                "ربيع الأول",
                "ربيع الثاني",
                "جمادى الأولى",
                "جمادى الثانية",
                "رجب",
                "شعبان",
                "رمضان",
                "شوال",
                "ذو القعدة",
                "ذو الحجة"
            ]
        },
        fil: { // Filipino
            today: "ngayon",
            days: [
                "Lin",
                "Lun",
                "Mar",
                "Mier",
                "Hueb",
                "Bier",
                "Saba"
            ],
            months: [
                "Enero",
                "Pebrero",
                "Marso",
                "Abril",
                "Mayo",
                "Hunyo",
                "Hulyo",
                "Agosto",
                "Septyembre",
                "Oktubre",
                "Nobyembre",
                "Disyembre"
            ]
        },
        dv: { // Divehi
            today: "މިއަދު",
            days: [
                "އާދީއްތަ",
                "ހޯމަ",
                "އަންގާރަ",
                "ބުދަ",
                "ބުރާސްފަތި",
                "ހުކުރު",
                "ހޮނިހިރު"
            ],
            months: [
                "މުޙައްރަމް",
                "ޞަފަރު",
                "ރަބީޢުލްއައްވަލް",
                "ރަބީޢުލްއާޚިރު",
                "ޖުމާދަލްއޫލާ",
                "ޖުމާދަލްއާޚިރާ",
                "ރަޖަބް",
                "ޝަޢްބާން",
                "ރަމަޟާން",
                "ޝައްވާލް",
                "ޛުލްޤަޢިދާ",
                "ޛުލްޙިއްޖާ"
            ]
        },
        ha: { // Hausa
            today: "yau",
            days: [
                "Lah",
                "Lit",
                "Tal",
                "Lar",
                "Alh",
                "Jum",
                "Asa"
            ],
            months: [
                "Januwaru",
                "Febreru",
                "Maris",
                "Afrilu",
                "Mayu",
                "Yuni",
                "Yuli",
                "Agusta",
                "Satumba",
                "Oktocba",
                "Nuwamba",
                "Disamba"
            ]
        },
        yo: { // Yoruba
            today: "loni",
            days: [
                "Aik",
                "Aje",
                "Ise",
                "Ojo",
                "Ojo",
                "Eti",
                "Aba"
            ],
            months: [
                "Osu kinni",
                "Osu keji",
                "Osu keta",
                "Osu kerin",
                "Osu karun",
                "Osu kefa",
                "Osu keje",
                "Osu kejo",
                "Osu kesan",
                "Osu kewa",
                "Osu kokanla",
                "Osu keresi"
            ]
        },
        quz: { // Quechua
            today: "kunan",
            days: [
                "int",
                "kil",
                "ati",
                "quy",
                "Ch'",
                "Ill",
                "k'u"
            ],
            months: [
                "Qulla puquy",
                "Hatun puquy",
                "Pauqar waray",
                "ayriwa",
                "Aymuray",
                "Inti raymi",
                "Anta Sitwa",
                "Qhapaq Sitwa",
                "Uma raymi",
                "Kantaray",
                "Ayamarq'a",
                "Kapaq Raymi"
            ]
        },
        nso: { // Sesotho sa Leboa
            today: "Lehono",
            days: [
                "Lam",
                "Moš",
                "Lbb",
                "Lbr",
                "Lbn",
                "Lbh",
                "Mok"
            ],
            months: [
                "Pherekgong",
                "Hlakola",
                "Mopitlo",
                "Moranang",
                "Mosegamanye",
                "Ngoatobošego",
                "Phuphu",
                "Phato",
                "Lewedi",
                "Diphalana",
                "Dibatsela",
                "Manthole"
            ]
        },
        ba: { // Bashkir
            today: "бөгөн",
            days: [
                "Йш",
                "Дш",
                "Шш",
                "Шр",
                "Кс",
                "Йм",
                "Шб"
            ],
            months: [
                "ғинуар",
                "февраль",
                "март",
                "апрель",
                "май",
                "июнь",
                "июль",
                "август",
                "сентябрь",
                "октябрь",
                "ноябрь",
                "декабрь"
            ]
        },
        lb: { // Luxembourgish
            today: "haut",
            days: [
                "Son",
                "Méi",
                "Dën",
                "Mët",
                "Don",
                "Fre",
                "Sam"
            ],
            months: [
                "Januar",
                "Februar",
                "Mäerz",
                "Abrëll",
                "Mee",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
            ]
        },
        kl: { // Greenlandic
            today: "ullumi",
            days: [
                "sap",
                "ata",
                "mar",
                "ping",
                "sis",
                "tal",
                "arf"
            ],
            months: [
                "januari",
                "februari",
                "martsi",
                "apriili",
                "maaji",
                "juni",
                "juli",
                "aggusti",
                "septembari",
                "oktobari",
                "novembari",
                "decembari"
            ]
        },
        ig: { // Igbo
            today: "taa",
            days: [
                "Aik",
                "Aje",
                "Ise",
                "Ojo",
                "Ojo",
                "Eti",
                "Aba"
            ],
            months: [
                "Onwa mbu",
                "Onwa ibua",
                "Onwa ato",
                "Onwa ano",
                "Onwa ise",
                "Onwa isi",
                "Onwa asa",
                "Onwa asato",
                "Onwa itolu",
                "Onwa iri",
                "Onwa iri n'ofu",
                "Onwa iri n'ibua"
            ]
        },
        ii: { // Yi
            today: "ꀃꑍ",
            days: [
                "ꑭꆏ",
                "ꆏ꒔",
                "ꆏꑍ",
                "ꆏꌕ",
                "ꆏꇖ",
                "ꆏꉬ",
                "ꆏꃘ"
            ],
            months: [
                "ꋍꆪ",
                "ꑍꆪ",
                "ꌕꆪ",
                "ꇖꆪ",
                "ꉬꆪ",
                "ꃘꆪ",
                "ꏃꆪ",
                "ꉆꆪ",
                "ꈬꆪ",
                "ꊰꆪ",
                "ꊯꊪꆪ",
                "ꊰꑋꆪ"
            ]
        },
        arn: { // Mapudungun
            today: "fachantü",
            days: [
                "dom",
                "lun",
                "mar",
                "mié",
                "jue",
                "vie",
                "sáb"
            ],
            months: [
                "enero",
                "febrero",
                "marzo",
                "abril",
                "mayo",
                "junio",
                "julio",
                "agosto",
                "septiembre",
                "octubre",
                "noviembre",
                "diciembre"
            ]
        },
        moh: { // Mohawk
            today: "okàra",
            days: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            months: [
                "Tsothohrkó:Wa",
                "Enniska",
                "Enniskó:Wa",
                "Onerahtókha",
                "Onerahtohkó:Wa",
                "Ohiari:Ha",
                "Ohiarihkó:Wa",
                "Seskéha",
                "Seskehkó:Wa",
                "Kenténha",
                "Kentenhkó:Wa",
                "Tsothóhrha"
            ]
        },
        br: { // Breton
            today: "hiziv",
            days: [
                "Sul",
                "Lun",
                "Meu.",
                "Mer.",
                "Yaou",
                "Gwe.",
                "Sad."
            ],
            months: [
                "Genver",
                "C'hwevrer",
                "Meurzh",
                "Ebrel",
                "Mae",
                "Mezheven",
                "Gouere",
                "Eost",
                "Gwengolo",
                "Here",
                "Du",
                "Kerzu"
            ]
        },
        ug: { // Uyghur
            today: "bügün",
            days: [
                "يە",
                "دۈ",
                "سە",
                "چا",
                "پە",
                "جۈ",
                "شە"
            ],
            months: [
                "1-ئاي",
                "2-ئاي",
                "3-ئاي",
                "4-ئاي",
                "5-ئاي",
                "6-ئاي",
                "7-ئاي",
                "8-ئاي",
                "9-ئاي",
                "10-ئاي",
                "11-ئاي",
                "12-ئاي"
            ]
        },
        mi: { // Maori
            today: "i tenei ra",
            days: [
                "Ta",
                "Hi",
                "Tū",
                "Apa",
                "Pa",
                "Me",
                "Ho"
            ],
            months: [
                "Kohi-tātea",
                "Hui-tanguru",
                "Poutū-te-rangi",
                "Paenga-whāwhā",
                "Haratua",
                "Pipiri",
                "Hōngongoi",
                "Here-turi-kōkā",
                "Mahuru",
                "Whiringa-ā-nuku",
                "Whiringa-ā-rangi",
                "Hakihea"
            ]
        },
        oc: { // Occitan
            today: "uèi",
            days: [
                "dim.",
                "lun.",
                "mar.",
                "mèc.",
                "jòu.",
                "ven.",
                "sab."
            ],
            months: [
                "genier",
                "febrier",
                "març",
                "abril",
                "mai",
                "junh",
                "julh",
                "agost",
                "setembre",
                "octobre",
                "novembre",
                "desembre"
            ]
        },
        co: { // Corsican
            today: "oghje",
            days: [
                "dum.",
                "lun.",
                "mar.",
                "mer.",
                "ghj.",
                "ven.",
                "sab."
            ],
            months: [
                "ghjennaghju",
                "ferraghju",
                "marzu",
                "aprile",
                "maghju",
                "ghjunghju",
                "lugliu",
                "aostu",
                "settembre",
                "ottobre",
                "nuvembre",
                "dicembre"
            ]
        },
        gsw: { // Alsatian
            today: "heit",
            days: [
                "Su.",
                "Mo.",
                "Di.",
                "Mi.",
                "Du.",
                "Fr.",
                "Sà."
            ],
            months: [
                "Jänner",
                "Feverje",
                "März",
                "Àpril",
                "Mai",
                "Jüni",
                "Jüli",
                "Augscht",
                "September",
                "Oktower",
                "Nowember",
                "Dezember"
            ]
        },
        sah: { // Yakut
            today: "bügün",
            days: [
                "Бс",
                "Бн",
                "Оп",
                "Ср",
                "Чп",
                "Бт",
                "Сб"
            ],
            months: [
                "Тохсунньу",
                "Олунньу",
                "Кулун тутар",
                "Муус устар",
                "Ыам ыйа",
                "Бэс ыйа",
                "От ыйа",
                "Атырдьах ыйа",
                "Балаҕан ыйа",
                "Алтынньы",
                "Сэтинньи",
                "Ахсынньы"
            ]
        },
        qut: { // K'iche
            today: "[kamik]",
            days: [
                "juq",
                "kaq",
                "oxq",
                "kajq",
                "joq",
                "waqq",
                "wuqq"
            ],
            months: [
                "nab'e ik'",
                "ukab' ik'",
                "rox ik'",
                "ukaj ik'",
                "uro' ik'",
                "uwaq ik'",
                "uwuq ik'",
                "uwajxaq ik'",
                "ub'elej ik'",
                "ulaj ik'",
                "ujulaj ik'",
                "ukab'laj ik'"
            ]
        },
        rw: { // Kinyarwanda
            today: "uyu munsi",
            days: [
                "mbe.",
                "kab.",
                "gat.",
                "kan.",
                "gat.",
                "gat.",
                "cyu."
            ],
            months: [
                "Mutarama",
                "Gashyantare",
                "Werurwe",
                "Mata",
                "Gicurasi",
                "Kamena",
                "Nyakanga",
                "Kanama",
                "Nzeli",
                "Ukwakira",
                "Ugushyingo",
                "Ukuboza"
            ]
        },
        wo: { // Wolof
            today: "tey",
            days: [
                "dim.",
                "lun.",
                "mar.",
                "mer.",
                "jeu.",
                "ven.",
                "sam."
            ],
            months: [
                "janvier",
                "février",
                "mars",
                "avril",
                "mai",
                "juin",
                "juillet",
                "août",
                "septembre",
                "octobre",
                "novembre",
                "décembre"
            ]
        },
        prs: { // Dari
            today: "امروز",
            days: [
                "الأحد",
                "الإثنين",
                "الثلاثاء",
                "الأربعاء",
                "الخميس",
                "الجمعة",
                "السبت"
            ],
            months: [
                "محرم",
                "صفر",
                "ربيع الأول",
                "ربيع الثاني",
                "جمادى الأولى",
                "جمادى الثانية",
                "رجب",
                "شعبان",
                "رمضان",
                "شوال",
                "ذو القعدة",
                "ذو الحجة"
            ]
        },
        gd: { // Scottish Gaelic
            today: "an-diugh",
            days: [
                "Dòm",
                "Lua",
                "Mài",
                "Cia",
                "Ard",
                "Hao",
                "Sat"
            ],
            months: [
                "Am Faoilleach",
                "An Gearran",
                "Am Màrt",
                "An Giblean",
                "An Cèitean",
                "An t-Ògmhios",
                "An t-Iuchar",
                "An Lùnastal",
                "An t-Sultain",
                "An Dàmhair",
                "An t-Samhain",
                "An Dùbhlachd"
            ]
        },
        smn: { // Sami (Inari)
            today: "onne",
            days: [
                "pa",
                "vu",
                "ma",
                "ko",
                "tu",
                "vá",
                "lá"
            ],
            months: [
                "uđđâivemáánu",
                "kuovâmáánu",
                "njuhčâmáánu",
                "cuáŋuimáánu",
                "vyesimáánu",
                "kesimáánu",
                "syeinimáánu",
                "porgemáánu",
                "čohčâmáánu",
                "roovvâdmáánu",
                "skammâmáánu",
                "juovlâmáánu"
            ]
        },
        sms: { // Sami (Skolt)
            today: "pei ́vv",
            days: [
                "pâ",
                "vu",
                "mâ",
                "se",
                "ne",
                "pi",
                "su"
            ],
            months: [
                "ođđee´jjmään",
                "tä´lvvmään",
                "pâ´zzlâšttammään",
                "njuhččmään",
                "vue´ssmään",
                "ǩie´ssmään",
                "suei´nnmään",
                "på´rǧǧmään",
                "čõhččmään",
                "kålggmään",
                "skamm´mään",
                "rosttovmään"
            ]
        },
        zh: { // Simplified Chinese 
            days: [
                "星期天",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六"
            ],
            months: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            today: "今天",
        },
        "zh-hans": { //Simplified Chinese, informal
            days: [
                "周日",
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六"
            ],
            months: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            today: "今天",
        },
        "zh-hant": { // Traditional Chinese
            days: [
                "週日",
                "週一",
                "週二",
                "週三",
                "週四",
                "週五",
                "週六"
            ],
            months: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            today: "今天",
        },
        nn: { // Norwegian (Nynorsk)
            today: "i dag",
            days: [
                "sø",
                "må",
                "ty",
                "on",
                "to",
                "fr",
                "la"
            ],
            months: [
                "januar",
                "februar",
                "mars",
                "april",
                "mai",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "desember"
            ]
        },
        bs: { // Bosnian
            today: "danas",
            days: [
                "ned",
                "pon",
                "uto",
                "sri",
                "čet",
                "pet",
                "sub"
            ],
            months: [
                "januar",
                "februar",
                "mart",
                "april",
                "maj",
                "juni",
                "juli",
                "avgust",
                "septembar",
                "oktobar",
                "novembar",
                "decembar"
            ]
        },
        sma: { // Sami (Southern)
            today: "daenbiejjien",
            days: [
                "aej",
                "måa",
                "dæj",
                "gask",
                "duar",
                "bearj",
                "laav"
            ],
            months: [
                "tsïengele",
                "goevte",
                "njoktje",
                "voerhtje",
                "suehpede",
                "ruffie",
                "snjaltje",
                "mïetske",
                "skïerede",
                "golke",
                "rahka",
                "goeve"
            ]
        },
        nb: { // Norwegian (Bokmål)
            today: "i dag",
            days: [
                "sø",
                "ma",
                "ti",
                "on",
                "to",
                "fr",
                "lø"
            ],
            months: [
                "januar",
                "februar",
                "mars",
                "april",
                "mai",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "desember"
            ]
        },
        sr: { // Serbian
            today: "данас",
            days: [
                "ned",
                "pon",
                "uto",
                "sre",
                "čet",
                "pet",
                "sub"
            ],
            months: [
                "januar",
                "februar",
                "mart",
                "april",
                "maj",
                "jun",
                "jul",
                "avgust",
                "septembar",
                "oktobar",
                "novembar",
                "decembar"
            ]
        },
        dsb: { // Lower Sorbian
            today: "źinsa",
            days: [
                "nje",
                "pon",
                "wał",
                "srj",
                "stw",
                "pět",
                "sob"
            ],
            months: [
                "januar",
                "februar",
                "měrc",
                "apryl",
                "maj",
                "junij",
                "julij",
                "awgust",
                "september",
                "oktober",
                "nowember",
                "december"
            ]
        },
        smj: { // Sami (Lule)
            today: "uddni",
            days: [
                "ájl",
                "mán",
                "dis",
                "gas",
                "duor",
                "bier",
                "láv"
            ],
            months: [
                "ådåjakmánno",
                "guovvamánno",
                "sjnjuktjamánno",
                "vuoratjismánno",
                "moarmesmánno",
                "biehtsemánno",
                "sjnjilltjamánno",
                "bårggemánno",
                "ragátmánno",
                "gålgådismánno",
                "basádismánno",
                "javllamánno"
            ]
        }
    }
}

class Input {
  constructor(input) {
    this.element = input;
    this.element.setAttribute(pickerAppliedAttr, '');
    if (dateInputIsSupported) {
      // this wil both prevent the native datepicker displaying AND allow asigning a value attribute which is not ISO8601 compliant
      this.element.type = 'date-polyfill';
      // this.element.addEventListener('click', preventDefault);
    }

    let langEl = this.element,
        lang = '';

    while(langEl.parentNode) {
      lang = langEl.getAttribute('lang');
      if(lang) {
        break;
      }
      langEl = langEl.parentNode;
    }

    this.setLocaleText(lang);
    if (!this.element.placeholder) {
      this.element.placeholder = this.localeText.format.replace('M', 'mm').replace('D', 'dd').replace('Y', 'yyyy');
    }
    const valuePropDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.element), 'value');
    if (valuePropDescriptor === null) {
      valuePropDescriptor = { get:() => this.element.getAttribute('value'), set() {} };
      console.log("nodep-date-input-polyfill: unable to obtain native input[type=date] .value propertyDescriptor");
    }
    Object.defineProperties(
      this.element,
      {
        'textValue': {
          get: valuePropDescriptor.get,
          set: valuePropDescriptor.set
        },
        'value': {
          get: ()=> this.element.polyfillValue,
          set: val=> {
            if(!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
              this.element.polyfillValue = this.element.textValue  = '';
              this.element.setAttribute('value', '');
              return;
            }

            this.element.polyfillValue = val;

            const YMD = val.split(`-`);
            this.element.textValue = this.localeText.format
              .replace(`Y`, YMD[0])
              .replace(`M`, YMD[1])
              .replace(`D`, YMD[2]);
            this.element.setAttribute(
              `value`,
              this.element.textValue
            );
            
          }
        },
        'valueAsDate': {
          get: ()=> {
            if(!this.element.polyfillValue) {
              return null;
            }

            return new Date(this.element.polyfillValue);
          },
          set: val=> {
            if (val === null || isNaN(val.getTime())) {
              this.element.value = '';
            } else {
              this.element.value = val.toISOString().slice(0,10);
            }
          }
        },
        'valueAsNumber': {
          get: ()=> {
            if(!this.element.value) {
              return NaN;
            }

            return this.element.valueAsDate.getTime();
          },
          set: val=> {
            this.element.valueAsDate = new Date(val);
          }
        }
      }
    );

    // Initialize value for display.
    this.element.value = this.element.getAttribute('value');

    // Open the picker when the input get focus,
    // also on various click events to capture it in all corner cases.
    const showPicker = ()=> {
      Picker.instance.attachTo(this);
    };
    const passiveOpt = { passive: true };
    this.element.addEventListener('focus', showPicker, passiveOpt);
    this.element.addEventListener('mousedown', showPicker, passiveOpt);
    this.element.addEventListener('mouseup', showPicker, passiveOpt);

    // Update the picker if the date changed manually in the input.
    this.element.addEventListener('keydown', e=> {
      let beginValue = this.element.valueAsDate;
      let requirePing = true;
      let requireParse = false;
      switch(e.keyCode) {
        case 9:
        case 27:
          Picker.instance.hide();
          requirePing = false;
          break;
        case 38:
          if (beginValue === null) { beginValue = new Date(); }
          beginValue.setDate(beginValue.getDate() + 1);
          this.element.valueAsDate = beginValue;
          break;
        case 40:
          if (beginValue === null) { beginValue = new Date(); }
          beginValue.setDate(beginValue.getDate() - 1);
          this.element.valueAsDate = beginValue;
          break;
        default:
          requireParse = true;
      }
      if (requirePing) {
        if (requireParse) {
          const self = this;
          setTimeout(() => {
            const parseDt = self.localeText.parseLocale(self.element.textValue);
            if (parseDt) {
              parseDt.setTime(parseDt.getTime() - parseDt.getTimezoneOffset() * 60000);
            }
            if (+parseDt !== +self.element.valueAsDate) {
              self.element.valueAsDate = parseDt;
              Picker.instance.pingInput();
              Picker.instance.sync();
            }
          }, 1);
        } else {
          Picker.instance.pingInput();
          Picker.instance.sync();
        }
      }
    }, passiveOpt);
  }

  setLocaleText(elementLang) {
    let preferredLocales = window.navigator.languages
      ? [...window.navigator.languages]
      : [ window.navigator.userLanguage || window.navigator.language ];
    // user browser preference 1st then element language - arguably should unshift here, or could get complex and 
    // differentiate element language only (length===2) from language and culture both defined on a containing element
    if (elementLang) { preferredLocales.push(elementLang); }

    const li = getLanguageInfo(preferredLocales);
    // First, look for an exact match to the provided locale.
    // for (const pl of preferredLocales) { - with current core-js polyfills this will import Symbol polyfill, which is unnecessary bloat

    this.locale = li.locale;
    this.localeText = li;
  }

  static pendingDateInputs() {
    '[data-nodep-date-input-polyfill-debug]';
  }
}

function addPickers({ watchForInsert = false, allowForcePicker = false } = {}) {
    Picker.instance = new Picker();
    const findHelper = new FindInputsHelper({ allowForcePicker });
        // Get and loop all the input[type="date"]s in the page that do not have `[data-has-picker]` yet.
    findHelper.getAllInputsForPolyfilling().forEach((di) => new Input(di));
    if (watchForInsert) {
        const observer = new MutationObserver((mutations) => 
            mutations.forEach((m) => {
                if(m.type === 'childList') {
                    m.addedNodes.forEach((el) => {
                        if (el.nodeType === Node.ELEMENT_NODE) {
                            // [el, ...el.querySelectorAll('input[type=date]')] should do, but some problem with transpilling
                            // firefox fine with same transpile, but IE somehow tries to implement es.string.iterator rather than nodelist!
                            const nodes = Array.from(el.querySelectorAll('input[type=date]'));
                            nodes.push(el);
                            nodes.forEach((inpt) => {
                                if (findHelper.requiresPolyfilling(inpt)) {
                                    new Input(inpt);
                                }
                            });
                        }
                    });
                }
            })
        );
        // call `observe` on that MutationObserver instance, 
        // passing it the element to observe, and the options object
        observer.observe(document.body, {
            childList: true,
            attributes: false,
            subtree: true,
        });

        // this might not be the best way to handle this as it will not add placeholder until clicked
        /*
        document.body.addEventListener('mousedown', (evt)=> {
            if (findHelper.requiresPolyfilling(evt.target)) {
                return new Input(evt.target);
            }
        }, { passive: true });
        */
    }
}

export { addPickers };
//# sourceMappingURL=addPickers-08ced8bc.mjs.map
