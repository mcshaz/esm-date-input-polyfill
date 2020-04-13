// Localizations for UI text.
export function getLocaleFormat(localeNames) {
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
    const decrSpec = decreaseLocaleSpecificity(localeCpy[i])
    if (decrSpec) {
      localeCpy.push(decrSpec);
    }
  }
  const format = "Y-M-D";
  return { locale: "en", format, parseLocale: parseFromFormat(format) };
}

export function decreaseLocaleSpecificity(localeName) {
  const returnVar = localeName.replace(/-[a-z0-9]+$/, '');
  if (!returnVar || returnVar === localeName) {
    return null;
  }
  return returnVar;
}

export function parseFromFormat(format) {
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
