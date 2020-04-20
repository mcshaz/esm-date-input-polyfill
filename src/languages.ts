import { getLocaleFormat, decreaseLocaleSpecificity } from './locales';
import { LocaleDateHandler } from './locale-date-handler';

export interface LanguageDateNames { today: string; weekdays: string[]; months: string[] }
export interface LocaleDateInfo { selectedLocale: string; dateHandler: LocaleDateHandler; translation: LanguageDateNames }

// localeNames array is assumed to be already converted to lower case
export function getLanguageInfo(localeNames: string[]): LocaleDateInfo {
    const languages = getLanguages();
    const fmt = getLocaleFormat(localeNames);
    let translation: LanguageDateNames | undefined;
    let l: string | null = fmt.selectedLocale;
    while (l !== null && !(translation = languages[l as keyof typeof languages])) {
        l = decreaseLocaleSpecificity(l);
    }
    if (!translation) {
        translation = languages['en']; // shouldn't get to here - possibly throw an error?
    }

    return Object.assign(fmt, { translation });
}

function getLanguages() {
    return {
        ar: { // Arabic
            today: 'اليوم',
            weekdays: [
                'الأحد',
                'الإثنين',
                'الثلاثاء',
                'الأربعاء',
                'الخميس',
                'الجمعة',
                'السبت'
            ],
            months: [
                'محرم',
                'صفر',
                'ربيع الأول',
                'ربيع الثاني',
                'جمادى الأولى',
                'جمادى الثانية',
                'رجب',
                'شعبان',
                'رمضان',
                'شوال',
                'ذو القعدة',
                'ذو الحجة'
            ]
        },
        bg: { // Bulgarian
            today: 'днес',
            weekdays: [
                'нед',
                'пон',
                'вт',
                'ср',
                'четв',
                'пет',
                'съб'
            ],
            months: [
                'януари',
                'февруари',
                'март',
                'април',
                'май',
                'юни',
                'юли',
                'август',
                'септември',
                'октомври',
                'ноември',
                'декември'
            ]
        },
        ca: { // Catalan
            today: 'avui',
            weekdays: [
                'dg.',
                'dl.',
                'dt.',
                'dc.',
                'dj.',
                'dv.',
                'ds.'
            ],
            months: [
                'gener',
                'febrer',
                'març',
                'abril',
                'maig',
                'juny',
                'juliol',
                'agost',
                'setembre',
                'octubre',
                'novembre',
                'desembre'
            ]
        },
        cs: { // Czech
            today: 'dnes',
            weekdays: [
                'ne',
                'po',
                'út',
                'st',
                'čt',
                'pá',
                'so'
            ],
            months: [
                'leden',
                'únor',
                'březen',
                'duben',
                'květen',
                'červen',
                'červenec',
                'srpen',
                'září',
                'říjen',
                'listopad',
                'prosinec'
            ]
        },
        da: { // Danish
            today: 'i dag',
            weekdays: [
                'sø',
                'ma',
                'ti',
                'on',
                'to',
                'fr',
                'lø'
            ],
            months: [
                'januar',
                'februar',
                'marts',
                'april',
                'maj',
                'juni',
                'juli',
                'august',
                'september',
                'oktober',
                'november',
                'december'
            ]
        },
        de: { // German
            today: 'heute',
            weekdays: [
                'So',
                'Mo',
                'Di',
                'Mi',
                'Do',
                'Fr',
                'Sa'
            ],
            months: [
                'Januar',
                'Februar',
                'März',
                'April',
                'Mai',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Dezember'
            ]
        },
        el: { // Greek
            today: 'σήμερα',
            weekdays: [
                'Κυρ',
                'Δευ',
                'Τρι',
                'Τετ',
                'Πεμ',
                'Παρ',
                'Σαβ'
            ],
            months: [
                'Ιανουάριος',
                'Φεβρουάριος',
                'Μάρτιος',
                'Απρίλιος',
                'Μάιος',
                'Ιούνιος',
                'Ιούλιος',
                'Αύγουστος',
                'Σεπτέμβριος',
                'Οκτώβριος',
                'Νοέμβριος',
                'Δεκέμβριος'
            ]
        },
        en: { // English
            today: 'today',
            weekdays: [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ],
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        },
        es: { // Spanish
            today: 'hoy',
            weekdays: [
                'dom',
                'lun',
                'mar',
                'mié',
                'jue',
                'vie',
                'sáb'
            ],
            months: [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre'
            ]
        },
        fi: { // Finnish
            today: 'tänään',
            weekdays: [
                'su',
                'ma',
                'ti',
                'ke',
                'to',
                'pe',
                'la'
            ],
            months: [
                'tammikuu',
                'helmikuu',
                'maaliskuu',
                'huhtikuu',
                'toukokuu',
                'kesäkuu',
                'heinäkuu',
                'elokuu',
                'syyskuu',
                'lokakuu',
                'marraskuu',
                'joulukuu'
            ]
        },
        fr: { // French
            today: 'aujourd\'hui',
            weekdays: [
                'dim.',
                'lun.',
                'mar.',
                'mer.',
                'jeu.',
                'ven.',
                'sam.'
            ],
            months: [
                'janvier',
                'février',
                'mars',
                'avril',
                'mai',
                'juin',
                'juillet',
                'août',
                'septembre',
                'octobre',
                'novembre',
                'décembre'
            ]
        },
        he: { // Hebrew
            today: 'היום',
            weekdays: [
                'יום א',
                'יום ב',
                'יום ג',
                'יום ד',
                'יום ה',
                'יום ו',
                'שבת'
            ],
            months: [
                'ינואר',
                'פברואר',
                'מרץ',
                'אפריל',
                'מאי',
                'יוני',
                'יולי',
                'אוגוסט',
                'ספטמבר',
                'אוקטובר',
                'נובמבר',
                'דצמבר'
            ]
        },
        hu: { // Hungarian
            today: 'Ma',
            weekdays: [
                'V',
                'H',
                'K',
                'Sze',
                'Cs',
                'P',
                'Szo'
            ],
            months: [
                'január',
                'február',
                'március',
                'április',
                'május',
                'június',
                'július',
                'augusztus',
                'szeptember',
                'október',
                'november',
                'december'
            ]
        },
        is: { // Icelandic
            today: 'Í dag',
            weekdays: [
                'sun.',
                'mán.',
                'þri.',
                'mið.',
                'fim.',
                'fös.',
                'lau.'
            ],
            months: [
                'janúar',
                'febrúar',
                'mars',
                'apríl',
                'maí',
                'júní',
                'júlí',
                'ágúst',
                'september',
                'október',
                'nóvember',
                'desember'
            ]
        },
        it: { // Italian
            today: 'oggi',
            weekdays: [
                'dom',
                'lun',
                'mar',
                'mer',
                'gio',
                'ven',
                'sab'
            ],
            months: [
                'gennaio',
                'febbraio',
                'marzo',
                'aprile',
                'maggio',
                'giugno',
                'luglio',
                'agosto',
                'settembre',
                'ottobre',
                'novembre',
                'dicembre'
            ]
        },
        ja: { // Japanese
            today: '今日',
            weekdays: [
                '日',
                '月',
                '火',
                '水',
                '木',
                '金',
                '土'
            ],
            months: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月'
            ]
        },
        ko: { // Korean
            today: '오늘',
            weekdays: [
                '일',
                '월',
                '화',
                '수',
                '목',
                '금',
                '토'
            ],
            months: [
                '1월',
                '2월',
                '3월',
                '4월',
                '5월',
                '6월',
                '7월',
                '8월',
                '9월',
                '10월',
                '11월',
                '12월'
            ]
        },
        nl: { // Dutch
            today: 'vandaag',
            weekdays: [
                'zo',
                'ma',
                'di',
                'wo',
                'do',
                'vr',
                'za'
            ],
            months: [
                'januari',
                'februari',
                'maart',
                'april',
                'mei',
                'juni',
                'juli',
                'augustus',
                'september',
                'oktober',
                'november',
                'december'
            ]
        },
        no: { // Norwegian
            today: 'i dag',
            weekdays: [
                'sø',
                'ma',
                'ti',
                'on',
                'to',
                'fr',
                'lø'
            ],
            months: [
                'januar',
                'februar',
                'mars',
                'april',
                'mai',
                'juni',
                'juli',
                'august',
                'september',
                'oktober',
                'november',
                'desember'
            ]
        },
        pl: { // Polish
            today: 'dzisiaj',
            weekdays: [
                'N',
                'Pn',
                'Wt',
                'Śr',
                'Cz',
                'Pt',
                'So'
            ],
            months: [
                'styczeń',
                'luty',
                'marzec',
                'kwiecień',
                'maj',
                'czerwiec',
                'lipiec',
                'sierpień',
                'wrzesień',
                'październik',
                'listopad',
                'grudzień'
            ]
        },
        pt: { // Portuguese
            today: 'hoje',
            weekdays: [
                'dom',
                'seg',
                'ter',
                'qua',
                'qui',
                'sex',
                'sáb'
            ],
            months: [
                'janeiro',
                'fevereiro',
                'março',
                'abril',
                'maio',
                'junho',
                'julho',
                'agosto',
                'setembro',
                'outubro',
                'novembro',
                'dezembro'
            ]
        },
        rm: { // Romansh
            today: 'oz',
            weekdays: [
                'du',
                'gli',
                'ma',
                'me',
                'gie',
                've',
                'so'
            ],
            months: [
                'schaner',
                'favrer',
                'mars',
                'avrigl',
                'matg',
                'zercladur',
                'fanadur',
                'avust',
                'settember',
                'october',
                'november',
                'december'
            ]
        },
        ro: { // Romanian
            today: 'astăzi',
            weekdays: [
                'D',
                'L',
                'Ma',
                'Mi',
                'J',
                'V',
                'S'
            ],
            months: [
                'ianuarie',
                'februarie',
                'martie',
                'aprilie',
                'mai',
                'iunie',
                'iulie',
                'august',
                'septembrie',
                'octombrie',
                'noiembrie',
                'decembrie'
            ]
        },
        ru: { // Russian
            today: 'Cегодня',
            weekdays: [
                'Вс',
                'Пн',
                'Вт',
                'Ср',
                'Чт',
                'Пт',
                'Сб'
            ],
            months: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ]
        },
        hr: { // Croatian
            today: 'danas',
            weekdays: [
                'ned',
                'pon',
                'uto',
                'sri',
                'čet',
                'pet',
                'sub'
            ],
            months: [
                'siječanj',
                'veljača',
                'ožujak',
                'travanj',
                'svibanj',
                'lipanj',
                'srpanj',
                'kolovoz',
                'rujan',
                'listopad',
                'studeni',
                'prosinac'
            ]
        },
        sk: { // Slovak
            today: 'dnes',
            weekdays: [
                'ne',
                'po',
                'ut',
                'st',
                'št',
                'pi',
                'so'
            ],
            months: [
                'január',
                'február',
                'marec',
                'apríl',
                'máj',
                'jún',
                'júl',
                'august',
                'september',
                'október',
                'november',
                'december'
            ]
        },
        sq: { // Albanian
            today: 'sot',
            weekdays: [
                'Die',
                'Hën',
                'Mar',
                'Mër',
                'Enj',
                'Pre',
                'Sht'
            ],
            months: [
                'janar',
                'shkurt',
                'mars',
                'prill',
                'maj',
                'qershor',
                'korrik',
                'gusht',
                'shtator',
                'tetor',
                'nëntor',
                'dhjetor'
            ]
        },
        sv: { // Swedish
            today: 'i dag',
            weekdays: [
                'sö',
                'må',
                'ti',
                'on',
                'to',
                'fr',
                'lö'
            ],
            months: [
                'januari',
                'februari',
                'mars',
                'april',
                'maj',
                'juni',
                'juli',
                'augusti',
                'september',
                'oktober',
                'november',
                'december'
            ]
        },
        th: { // Thai
            today: 'ในวันนี้',
            weekdays: [
                'อา.',
                'จ.',
                'อ.',
                'พ.',
                'พฤ.',
                'ศ.',
                'ส.'
            ],
            months: [
                'มกราคม',
                'กุมภาพันธ์',
                'มีนาคม',
                'เมษายน',
                'พฤษภาคม',
                'มิถุนายน',
                'กรกฎาคม',
                'สิงหาคม',
                'กันยายน',
                'ตุลาคม',
                'พฤศจิกายน',
                'ธันวาคม'
            ]
        },
        tr: { // Turkish
            today: 'bugün',
            weekdays: [
                'Paz',
                'Pzt',
                'Sal',
                'Çar',
                'Per',
                'Cum',
                'Cmt'
            ],
            months: [
                'Ocak',
                'Şubat',
                'Mart',
                'Nisan',
                'Mayıs',
                'Haziran',
                'Temmuz',
                'Ağustos',
                'Eylül',
                'Ekim',
                'Kasım',
                'Aralık'
            ]
        },
        ur: { // Urdu
            today: 'آج',
            weekdays: [
                'اتوار',
                'پير',
                'منگل',
                'بدھ',
                'جمعرات',
                'جمعه',
                'هفته'
            ],
            months: [
                'جنوری',
                'فروری',
                'مارچ',
                'اپریل',
                'مئی',
                'جون',
                'جولائی',
                'اگست',
                'ستمبر',
                'اکتوبر',
                'نومبر',
                'دسمبر'
            ]
        },
        id: { // Indonesian
            today: 'hari ini',
            weekdays: [
                'Minggu',
                'Sen',
                'Sel',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu'
            ],
            months: [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'Nopember',
                'Desember'
            ]
        },
        uk: { // Ukrainian
            today: 'сьогодні',
            weekdays: [
                'Нд',
                'Пн',
                'Вт',
                'Ср',
                'Чт',
                'Пт',
                'Сб'
            ],
            months: [
                'Січень',
                'Лютий',
                'Березень',
                'Квітень',
                'Травень',
                'Червень',
                'Липень',
                'Серпень',
                'Вересень',
                'Жовтень',
                'Листопад',
                'Грудень'
            ]
        },
        be: { // Belarusian
            today: 'сёння',
            weekdays: [
                'нд',
                'пн',
                'аў',
                'ср',
                'чц',
                'пт',
                'сб'
            ],
            months: [
                'Студзень',
                'Люты',
                'Сакавік',
                'Красавік',
                'Май',
                'Чэрвень',
                'Ліпень',
                'Жнівень',
                'Верасень',
                'Кастрычнік',
                'Лістапад',
                'Снежань'
            ]
        },
        sl: { // Slovenian
            today: 'danes',
            weekdays: [
                'ned',
                'pon',
                'tor',
                'sre',
                'čet',
                'pet',
                'sob'
            ],
            months: [
                'januar',
                'februar',
                'marec',
                'april',
                'maj',
                'junij',
                'julij',
                'avgust',
                'september',
                'oktober',
                'november',
                'december'
            ]
        },
        et: { // Estonian
            today: 'täna',
            weekdays: [
                'P',
                'E',
                'T',
                'K',
                'N',
                'R',
                'L'
            ],
            months: [
                'jaanuar',
                'veebruar',
                'märts',
                'aprill',
                'mai',
                'juuni',
                'juuli',
                'august',
                'september',
                'oktoober',
                'november',
                'detsember'
            ]
        },
        lv: { // Latvian
            today: 'šodien',
            weekdays: [
                'sv',
                'pr',
                'ot',
                'tr',
                'ce',
                'pk',
                'se'
            ],
            months: [
                'janvāris',
                'februāris',
                'marts',
                'aprīlis',
                'maijs',
                'jūnijs',
                'jūlijs',
                'augusts',
                'septembris',
                'oktobris',
                'novembris',
                'decembris'
            ]
        },
        lt: { // Lithuanian
            today: 'šiandien',
            weekdays: [
                'Sk',
                'Pr',
                'An',
                'Tr',
                'Kt',
                'Pn',
                'Št'
            ],
            months: [
                'sausis',
                'vasaris',
                'kovas',
                'balandis',
                'gegužė',
                'birželis',
                'liepa',
                'rugpjūtis',
                'rugsėjis',
                'spalis',
                'lapkritis',
                'gruodis'
            ]
        },
        tg: { // Tajik
            today: 'имрӯз',
            weekdays: [
                'Яш',
                'Дш',
                'Сш',
                'Чш',
                'Пш',
                'Ҷм',
                'Шн'
            ],
            months: [
                'Январ',
                'Феврал',
                'Март',
                'Апрел',
                'Май',
                'Июн',
                'Июл',
                'Август',
                'Сентябр',
                'Октябр',
                'Ноябр',
                'Декабр'
            ]
        },
        fa: { // Persian
            today: 'امروز',
            weekdays: [
                'الأحد',
                'الإثنين',
                'الثلاثاء',
                'الأربعاء',
                'الخميس',
                'الجمعة',
                'السبت'
            ],
            months: [
                'جانفييه',
                'فيفرييه',
                'مارس',
                'أفريل',
                'مي',
                'جوان',
                'جوييه',
                'أوت',
                'سبتمبر',
                'اكتوبر',
                'نوفمبر',
                'ديسمبر'
            ]
        },
        vi: { // Vietnamese
            today: 'hôm nay',
            weekdays: [
                'CN',
                'Hai',
                'Ba',
                'Tư',
                'Năm',
                'Sáu',
                'Bảy'
            ],
            months: [
                'Tháng Giêng',
                'Tháng Hai',
                'Tháng Ba',
                'Tháng Tư',
                'Tháng Năm',
                'Tháng Sáu',
                'Tháng Bảy',
                'Tháng Tám',
                'Tháng Chín',
                'Tháng Mười',
                'Tháng Mười Một',
                'Tháng Mười Hai'
            ]
        },
        hy: { // Armenian
            today: 'այսօր',
            weekdays: [
                'Կիր',
                'Երկ',
                'Երք',
                'Չրք',
                'Հնգ',
                'ՈՒր',
                'Շբթ'
            ],
            months: [
                'Հունվար',
                'Փետրվար',
                'Մարտ',
                'Ապրիլ',
                'Մայիս',
                'Հունիս',
                'Հուլիս',
                'Օգոստոս',
                'Սեպտեմբեր',
                'Հոկտեմբեր',
                'Նոյեմբեր',
                'Դեկտեմբեր'
            ]
        },
        az: { // Azeri
            today: 'bugün',
            weekdays: [
                'B',
                'Be',
                'Ça',
                'Ç',
                'Ca',
                'C',
                'Ş'
            ],
            months: [
                'Yanvar',
                'Fevral',
                'Mart',
                'Aprel',
                'May',
                'İyun',
                'İyul',
                'Avgust',
                'Sentyabr',
                'Oktyabr',
                'Noyabr',
                'Dekabr'
            ]
        },
        eu: { // Basque
            today: 'gaur',
            weekdays: [
                'ig.',
                'al.',
                'as.',
                'az.',
                'og.',
                'or.',
                'lr.'
            ],
            months: [
                'urtarrila',
                'otsaila',
                'martxoa',
                'apirila',
                'maiatza',
                'ekaina',
                'uztaila',
                'abuztua',
                'iraila',
                'urria',
                'azaroa',
                'abendua'
            ]
        },
        hsb: { // Upper Sorbian
            today: 'dźensa',
            weekdays: [
                'nje',
                'pón',
                'wut',
                'srj',
                'štw',
                'pja',
                'sob'
            ],
            months: [
                'januar',
                'februar',
                'měrc',
                'apryl',
                'meja',
                'junij',
                'julij',
                'awgust',
                'september',
                'oktober',
                'nowember',
                'december'
            ]
        },
        mk: { // Macedonian (FYROM)
            today: 'денес',
            weekdays: [
                'нед',
                'пон',
                'втр',
                'срд',
                'чет',
                'пет',
                'саб'
            ],
            months: [
                'јануари',
                'февруари',
                'март',
                'април',
                'мај',
                'јуни',
                'јули',
                'август',
                'септември',
                'октомври',
                'ноември',
                'декември'
            ]
        },
        tn: { // Setswana
            today: 'Gompieno',
            weekdays: [
                'Ltp.',
                'Mos.',
                'Lbd.',
                'Lbr.',
                'Lbn.',
                'Lbt.',
                'Lmt.'
            ],
            months: [
                'Ferikgong',
                'Tlhakole',
                'Mopitloe',
                'Moranang',
                'Motsheganong',
                'Seetebosigo',
                'Phukwi',
                'Phatwe',
                'Lwetse',
                'Diphalane',
                'Ngwanatsele',
                'Sedimothole'
            ]
        },
        xh: { // isiXhosa
            today: 'namhlanje',
            weekdays: [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ],
            months: [
                'Mqungu',
                'Mdumba',
                'Kwindla',
                'Tshazimpuzi',
                'Canzibe',
                'Silimela',
                'Khala',
                'Thupha',
                'Msintsi',
                'Dwarha',
                'Nkanga',
                'Mnga'
            ]
        },
        zu: { // isiZulu
            today: 'namhlanje',
            weekdays: [
                'Son.',
                'Mso.',
                'Bi.',
                'Tha.',
                'Ne.',
                'Hla.',
                'Mgq.'
            ],
            months: [
                'uMasingana',
                'uNhlolanja',
                'uNdasa',
                'uMbaso',
                'uNhlaba',
                'uNhlangulana',
                'uNtulikazi',
                'uNcwaba',
                'uMandulo',
                'uMfumfu',
                'uLwezi',
                'uZibandlela'
            ]
        },
        af: { // Afrikaans
            today: 'vandag',
            weekdays: [
                'Son',
                'Maan',
                'Dins',
                'Woen',
                'Dond',
                'Vry',
                'Sat'
            ],
            months: [
                'Januarie',
                'Februarie',
                'Maart',
                'April',
                'Mei',
                'Junie',
                'Julie',
                'Augustus',
                'September',
                'Oktober',
                'November',
                'Desember'
            ]
        },
        ka: { // Georgian
            today: 'დღეს',
            weekdays: [
                'კვირა',
                'ორშაბათი',
                'სამშაბათი',
                'ოთხშაბათი',
                'ხუთშაბათი',
                'პარასკევი',
                'შაბათი'
            ],
            months: [
                'იანვარი',
                'თებერვალი',
                'მარტი',
                'აპრილი',
                'მაისი',
                'ივნისი',
                'ივლისი',
                'აგვისტო',
                'სექტემბერი',
                'ოქტომბერი',
                'ნოემბერი',
                'დეკემბერი'
            ]
        },
        fo: { // Faroese
            today: 'í dag',
            weekdays: [
                'sun',
                'mán',
                'týs',
                'mik',
                'hós',
                'frí',
                'leyg'
            ],
            months: [
                'januar',
                'februar',
                'mars',
                'apríl',
                'mai',
                'juni',
                'juli',
                'august',
                'september',
                'oktober',
                'november',
                'desember'
            ]
        },
        hi: { // Hindi
            today: 'आज',
            weekdays: [
                'रवि.',
                'सोम.',
                'मंगल.',
                'बुध.',
                'गुरु.',
                'शुक्र.',
                'शनि.'
            ],
            months: [
                'जनवरी',
                'फरवरी',
                'मार्च',
                'अप्रैल',
                'मई',
                'जून',
                'जुलाई',
                'अगस्त',
                'सितम्बर',
                'अक्तूबर',
                'नवम्बर',
                'दिसम्बर'
            ]
        },
        mt: { // Maltese
            today: 'illum',
            weekdays: [
                'Ħad',
                'Tne',
                'Tli',
                'Erb',
                'Ħam',
                'Ġim',
                'Sib'
            ],
            months: [
                'Jannar',
                'Frar',
                'Marzu',
                'April',
                'Mejju',
                'Ġunju',
                'Lulju',
                'Awissu',
                'Settembru',
                'Ottubru',
                'Novembru',
                'Diċembru'
            ]
        },
        se: { // Sami (Northern)
            today: 'odne',
            weekdays: [
                'sotn',
                'vuos',
                'maŋ',
                'gask',
                'duor',
                'bear',
                'láv'
            ],
            months: [
                'ođđajagemánnu',
                'guovvamánnu',
                'njukčamánnu',
                'cuoŋománnu',
                'miessemánnu',
                'geassemánnu',
                'suoidnemánnu',
                'borgemánnu',
                'čakčamánnu',
                'golggotmánnu',
                'skábmamánnu',
                'juovlamánnu'
            ]
        },
        ga: { // Irish
            today: 'inniu',
            weekdays: [
                'Domh',
                'Luan',
                'Máir',
                'Céad',
                'Déar',
                'Aoi',
                'Sath'
            ],
            months: [
                'Eanáir',
                'Feabhra',
                'Márta',
                'Aibreán',
                'Bealtaine',
                'Meitheamh',
                'Iúil',
                'Lúnasa',
                'Meán Fómhair',
                'Deireadh Fómhair',
                'Samhain',
                'Nollaig'
            ]
        },
        ms: { // Malay
            today: 'hari ini',
            weekdays: [
                'Ahad',
                'Isnin',
                'Sel',
                'Rabu',
                'Khamis',
                'Jumaat',
                'Sabtu'
            ],
            months: [
                'Januari',
                'Februari',
                'Mac',
                'April',
                'Mei',
                'Jun',
                'Julai',
                'Ogos',
                'September',
                'Oktober',
                'November',
                'Disember'
            ]
        },
        kk: { // Kazakh
            today: 'бүгін',
            weekdays: [
                'Жк',
                'Дс',
                'Сс',
                'Ср',
                'Бс',
                'Жм',
                'Сн'
            ],
            months: [
                'қаңтар',
                'ақпан',
                'наурыз',
                'сәуір',
                'мамыр',
                'маусым',
                'шілде',
                'тамыз',
                'қыркүйек',
                'қазан',
                'қараша',
                'желтоқсан'
            ]
        },
        ky: { // Kyrgyz
            today: 'бүгүн',
            weekdays: [
                'Жш',
                'Дш',
                'Шш',
                'Шр',
                'Бш',
                'Жм',
                'Иш'
            ],
            months: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ]
        },
        sw: { // Kiswahili
            today: 'leo',
            weekdays: [
                'Jumap.',
                'Jumat.',
                'Juman.',
                'Jumat.',
                'Alh.',
                'Iju.',
                'Jumam.'
            ],
            months: [
                'Januari',
                'Februari',
                'Machi',
                'Aprili',
                'Mei',
                'Juni',
                'Julai',
                'Agosti',
                'Septemba',
                'Oktoba',
                'Novemba',
                'Decemba'
            ]
        },
        tk: { // Turkmen
            today: 'bugün',
            weekdays: [
                'Db',
                'Sb',
                'Çb',
                'Pb',
                'An',
                'Şb',
                'Ýb'
            ],
            months: [
                'Ýanwar',
                'Fewral',
                'Mart',
                'Aprel',
                'Maý',
                'lýun',
                'lýul',
                'Awgust',
                'Sentýabr',
                'Oktýabr',
                'Noýabr',
                'Dekabr'
            ]
        },
        uz: { // Uzbek
            today: 'Bugun',
            weekdays: [
                'yak.',
                'dsh.',
                'sesh.',
                'chr.',
                'psh.',
                'jm.',
                'sh.'
            ],
            months: [
                'yanvar',
                'fevral',
                'mart',
                'aprel',
                'may',
                'iyun',
                'iyul',
                'avgust',
                'sentyabr',
                'oktyabr',
                'noyabr',
                'dekabr'
            ]
        },
        tt: { // Tatar
            today: 'бүген',
            weekdays: [
                'Якш',
                'Дүш',
                'Сиш',
                'Чәрш',
                'Пәнҗ',
                'Җом',
                'Шим'
            ],
            months: [
                'Гыйнвар',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ]
        },
        bn: { // Bengali
            today: 'আজ',
            weekdays: [
                'রবি.',
                'সোম.',
                'মঙ্গল.',
                'বুধ.',
                'বৃহস্পতি.',
                'শুক্র.',
                'শনি.'
            ],
            months: [
                'জানুয়ারী',
                'ফেব্রুয়ারী',
                'মার্চ',
                'এপ্রিল',
                'মে',
                'জুন',
                'জুলাই',
                'আগস্ট',
                'সেপ্টেম্বর',
                'অক্টোবর',
                'নভেম্বর',
                'ডিসেম্বর'
            ]
        },
        pa: { // Punjabi
            today: 'ਅੱਜ',
            weekdays: [
                'ਐਤ.',
                'ਸੋਮ.',
                'ਮੰਗਲ.',
                'ਬੁੱਧ.',
                'ਵੀਰ.',
                'ਸ਼ੁਕਰ.',
                'ਸ਼ਨਿੱਚਰ.'
            ],
            months: [
                'ਜਨਵਰੀ',
                'ਫ਼ਰਵਰੀ',
                'ਮਾਰਚ',
                'ਅਪ੍ਰੈਲ',
                'ਮਈ',
                'ਜੂਨ',
                'ਜੁਲਾਈ',
                'ਅਗਸਤ',
                'ਸਤੰਬਰ',
                'ਅਕਤੂਬਰ',
                'ਨਵੰਬਰ',
                'ਦਸੰਬਰ'
            ]
        },
        gu: { // Gujarati
            today: 'આજે',
            weekdays: [
                'રવિ',
                'સોમ',
                'મંગળ',
                'બુધ',
                'ગુરુ',
                'શુક્ર',
                'શનિ'
            ],
            months: [
                'જાન્યુઆરી',
                'ફેબ્રુઆરી',
                'માર્ચ',
                'એપ્રિલ',
                'મે',
                'જૂન',
                'જુલાઈ',
                'ઑગસ્ટ',
                'સપ્ટેમ્બર',
                'ઑક્ટ્બર',
                'નવેમ્બર',
                'ડિસેમ્બર'
            ]
        },
        or: { // Oriya
            today: 'ଆଜି',
            weekdays: [
                'ରବି.',
                'ସୋମ.',
                'ମଙ୍ଗଳ.',
                'ବୁଧ.',
                'ଗୁରୁ.',
                'ଶୁକ୍ର.',
                'ଶନି.'
            ],
            months: [
                'ଜାନୁୟାରୀ',
                'ଫ୍ରେବୃୟାରୀ',
                'ମାର୍ଚ୍ଚ',
                'ଏପ୍ରିଲ୍‌',
                'ମେ',
                'ଜୁନ୍‌',
                'ଜୁଲାଇ',
                'ଅଗଷ୍ଟ',
                'ସେପ୍ଟେମ୍ବର',
                'ଅକ୍ଟୋବର',
                'ନଭେମ୍ବର',
                '(ଡିସେମ୍ବର'
            ]
        },
        ta: { // Tamil
            today: 'இன்று',
            weekdays: [
                'ஞாயிறு',
                'திங்கள்',
                'செவ்வாய்',
                'புதன்',
                'வியாழன்',
                'வெள்ளி',
                'சனி'
            ],
            months: [
                'ஜனவரி',
                'பிப்ரவரி',
                'மார்ச்',
                'ஏப்ரல்',
                'மே',
                'ஜூன்',
                'ஜூலை',
                'ஆகஸ்ட்',
                'செப்டம்பர்',
                'அக்டோபர்',
                'நவம்பர்',
                'டிசம்பர்'
            ]
        },
        te: { // Telugu
            today: 'నేడు',
            weekdays: [
                'ఆది.',
                'సోమ.',
                'మంగళ.',
                'బుధ.',
                'గురు.',
                'శుక్ర.',
                'శని.'
            ],
            months: [
                'జనవరి',
                'ఫిబ్రవరి',
                'మార్చి',
                'ఏప్రిల్',
                'మే',
                'జూన్',
                'జూలై',
                'ఆగస్టు',
                'సెప్టెంబర్',
                'అక్టోబర్',
                'నవంబర్',
                'డిసెంబర్'
            ]
        },
        kn: { // Kannada
            today: 'ಇಂದು',
            weekdays: [
                'ಭಾನು.',
                'ಸೋಮ.',
                'ಮಂಗಳ.',
                'ಬುಧ.',
                'ಗುರು.',
                'ಶುಕ್ರ.',
                'ಶನಿ.'
            ],
            months: [
                'ಜನವರಿ',
                'ಫೆಬ್ರವರಿ',
                'ಮಾರ್ಚ್',
                'ಎಪ್ರಿಲ್',
                'ಮೇ',
                'ಜೂನ್',
                'ಜುಲೈ',
                'ಆಗಸ್ಟ್',
                'ಸೆಪ್ಟಂಬರ್',
                'ಅಕ್ಟೋಬರ್',
                'ನವೆಂಬರ್',
                'ಡಿಸೆಂಬರ್'
            ]
        },
        ml: { // Malayalam
            today: 'ഇന്ന്',
            weekdays: [
                'ഞായർ.',
                'തിങ്കൾ.',
                'ചൊവ്വ.',
                'ബുധൻ.',
                'വ്യാഴം.',
                'വെള്ളി.',
                'ശനി.'
            ],
            months: [
                'ജനുവരി',
                'ഫെബ്റുവരി',
                'മാറ്ച്ച്',
                'ഏപ്റില്',
                'മെയ്',
                'ജൂണ്',
                'ജൂലൈ',
                'ഓഗസ്ററ്',
                'സെപ്ററംബറ്',
                'ഒക്ടോബറ്',
                'നവംബറ്',
                'ഡിസംബറ്'
            ]
        },
        as: { // Assamese
            today: 'আজি',
            weekdays: [
                'সোম.',
                'মঙ্গল.',
                'বুধ.',
                'বৃহ.',
                'শুক্র.',
                'শনি.',
                'ৰবি.'
            ],
            months: [
                'জানুৱাৰী',
                'ফেব্রুৱাৰী',
                'মার্চ',
                'এপ্রিল',
                'মে',
                'জুন',
                'জুলাই',
                'আগষ্ট',
                'চেপ্টেম্বর',
                'অক্টোবর',
                'নবেম্বর',
                'ডিচেম্বর'
            ]
        },
        mr: { // Marathi
            today: 'आज',
            weekdays: [
                'रवि.',
                'सोम.',
                'मंगळ.',
                'बुध.',
                'गुरु.',
                'शुक्र.',
                'शनि.'
            ],
            months: [
                'जानेवारी',
                'फेब्रुवारी',
                'मार्च',
                'एप्रिल',
                'मे',
                'जून',
                'जुलै',
                'ऑगस्ट',
                'सप्टेंबर',
                'ऑक्टोबर',
                'नोव्हेंबर',
                'डिसेंबर'
            ]
        },
        sa: { // Sanskrit
            today: 'अद्य',
            weekdays: [
                'रविवासरः',
                'सोमवासरः',
                'मङ्गलवासरः',
                'बुधवासरः',
                'गुरुवासरः',
                'शुक्रवासरः',
                'शनिवासरः'
            ],
            months: [
                'जनवरी',
                'फरवरी',
                'मार्च',
                'अप्रैल',
                'मई',
                'जून',
                'जुलाई',
                'अगस्त',
                'सितम्बर',
                'अक्तूबर',
                'नवम्बर',
                'दिसम्बर'
            ]
        },
        mn: { // Mongolian
            today: 'өнөөдөр',
            weekdays: [
                'Ня',
                'Да',
                'Мя',
                'Лх',
                'Пү',
                'Ба',
                'Бя'
            ],
            months: [
                '1 дүгээр сар',
                '2 дугаар сар',
                '3 дугаар сар',
                '4 дүгээр сар',
                '5 дугаар сар',
                '6 дугаар сар',
                '7 дугаар сар',
                '8 дугаар сар',
                '9 дүгээр сар',
                '10 дугаар сар',
                '11 дүгээр сар',
                '12 дугаар сар'
            ]
        },
        bo: { // Tibetan
            today: 'ད་རིང',
            weekdays: [
                'ཉི་མ།',
                'ཟླ་བ།',
                'མིག་དམར།',
                'ལྷག་པ།',
                'ཕུར་བུ།',
                'པ་སངས།',
                'སྤེན་པ།'
            ],
            months: [
                'སྤྱི་ཟླ་དང་པོ།',
                'སྤྱི་ཟླ་གཉིས་པ།',
                'སྤྱི་ཟླ་གསུམ་པ།',
                'སྤྱི་ཟླ་བཞི་པ།',
                'སྤྱི་ཟླ་ལྔ་པ།',
                'སྤྱི་ཟླ་དྲུག་པ།',
                'སྤྱི་ཟླ་བདུན་པ།',
                'སྤྱི་ཟླ་བརྒྱད་པ།',
                'སྤྱི་ཟླ་དགུ་པ།',
                'སྤྱི་ཟླ་བཅུ་པོ།',
                'སྤྱི་ཟླ་བཅུ་གཅིག་པ།',
                'སྤྱི་ཟླ་བཅུ་གཉིས་པ།'
            ]
        },
        cy: { // Welsh
            today: 'heddiw',
            weekdays: [
                'Sul',
                'Llun',
                'Maw',
                'Mer',
                'Iau',
                'Gwe',
                'Sad'
            ],
            months: [
                'Ionawr',
                'Chwefror',
                'Mawrth',
                'Ebrill',
                'Mai',
                'Mehefin',
                'Gorffennaf',
                'Awst',
                'Medi',
                'Hydref',
                'Tachwedd',
                'Rhagfyr'
            ]
        },
        km: { // Khmer
            today: 'ថ្ងៃនេះ',
            weekdays: [
                'អាទិ.',
                'ច.',
                'អ.',
                'ពុ',
                'ព្រហ.',
                'សុ.',
                'ស.'
            ],
            months: [
                'មករា',
                'កុម្ភៈ',
                'មិនា',
                'មេសា',
                'ឧសភា',
                'មិថុនា',
                'កក្កដា',
                'សីហា',
                'កញ្ញា',
                'តុលា',
                'វិច្ឆិកា',
                'ធ្នូ'
            ]
        },
        lo: { // Lao
            today: 'ໃນມື້ນີ້',
            weekdays: [
                'ອາທິດ',
                'ຈັນ',
                'ອັງຄານ',
                'ພຸດ',
                'ພະຫັດ',
                'ສຸກ',
                'ເສົາ'
            ],
            months: [
                'ມັງກອນ',
                'ກຸມພາ',
                'ມີນາ',
                'ເມສາ',
                'ພຶດສະພາ',
                'ມິຖຸນາ',
                'ກໍລະກົດ',
                'ສິງຫາ',
                'ກັນຍາ',
                'ຕຸລາ',
                'ພະຈິກ',
                'ທັນວາ'
            ]
        },
        gl: { // Galician
            today: 'hoxe',
            weekdays: [
                'dom',
                'luns',
                'mar',
                'mér',
                'xov',
                'ven',
                'sáb'
            ],
            months: [
                'xaneiro',
                'febreiro',
                'marzo',
                'abril',
                'maio',
                'xuño',
                'xullo',
                'agosto',
                'setembro',
                'outubro',
                'novembro',
                'decembro'
            ]
        },
        kok: { // Konkani
            today: 'आजि',
            weekdays: [
                'आय.',
                'सोम.',
                'मंगळ.',
                'बुध.',
                'बिरे.',
                'सुक्र.',
                'शेन.'
            ],
            months: [
                'जानेवारी',
                'फेब्रुवारी',
                'मार्च',
                'एप्रिल',
                'मे',
                'जून',
                'जुलै',
                'ऑगस्ट',
                'सप्टेंबर',
                'ऑक्टोबर',
                'नोवेम्बर',
                'डिसेंबर'
            ]
        },
        syr: { // Syriac
            today: 'ܝܘܡܐ',
            weekdays: [
                '܏ܐ ܏ܒܫ',
                '܏ܒ ܏ܒܫ',
                '܏ܓ ܏ܒܫ',
                '܏ܕ ܏ܒܫ',
                '܏ܗ ܏ܒܫ',
                '܏ܥܪܘܒ',
                '܏ܫܒ'
            ],
            months: [
                'ܟܢܘܢ ܐܚܪܝ',
                'ܫܒܛ',
                'ܐܕܪ',
                'ܢܝܣܢ',
                'ܐܝܪ',
                'ܚܙܝܪܢ',
                'ܬܡܘܙ',
                'ܐܒ',
                'ܐܝܠܘܠ',
                'ܬܫܪܝ ܩܕܝܡ',
                'ܬܫܪܝ ܐܚܪܝ',
                'ܟܢܘܢ ܩܕܝܡ'
            ]
        },
        si: { // Sinhala
            today: 'අද',
            weekdays: [
                'ඉරිදා',
                'සඳුදා',
                'කුජදා',
                'බුදදා',
                'ගුරුදා',
                'කිවිදා',
                'ශනිදා'
            ],
            months: [
                'ජනවාරි',
                'පෙබරවාරි',
                'මාර්තු',
                'අ‌ප්‍රේල්',
                'මැයි',
                'ජූනි',
                'ජූලි',
                'අ‌ගෝස්තු',
                'සැප්තැම්බර්',
                'ඔක්තෝබර්',
                'නොවැම්බර්',
                'දෙසැම්බර්'
            ]
        },
        iu: { // Inuktitut
            today: 'ullumi',
            weekdays: [
                'Nat',
                'Nag',
                'Aip',
                'Pi',
                'Sit',
                'Tal',
                'Siv'
            ],
            months: [
                'Jaannuari',
                'Viivvuari',
                'Maatsi',
                'Iipuri',
                'Mai',
                'Juuni',
                'Julai',
                'Aaggiisi',
                'Sitipiri',
                'Utupiri',
                'Nuvipiri',
                'Tisipiri'
            ]
        },
        am: { // Amharic
            today: 'ዛሬ',
            weekdays: [
                'እሑድ',
                'ሰኞ',
                'ማክሰ',
                'ረቡዕ',
                'ሐሙስ',
                'ዓርብ',
                'ቅዳሜ'
            ],
            months: [
                'ጃንዩወሪ',
                'ፌብሩወሪ',
                'ማርች',
                'ኤፕረል',
                'ሜይ',
                'ጁን',
                'ጁላይ',
                'ኦገስት',
                'ሴፕቴምበር',
                'ኦክተውበር',
                'ኖቬምበር',
                'ዲሴምበር'
            ]
        },
        tzm: { // Tamazight
            today: 'assa',
            weekdays: [
                'Ace',
                'Ari',
                'Ara',
                'Aha',
                'Amh',
                'Sem',
                'Sed'
            ],
            months: [
                'Yenayer',
                'Furar',
                'Maghres',
                'Yebrir',
                'Mayu',
                'Yunyu',
                'Yulyu',
                'Ghuct',
                'Cutenber',
                'Ktuber',
                'Wambir',
                'Dujanbir'
            ]
        },
        ne: { // Nepali
            today: 'आज',
            weekdays: [
                'आइत',
                'सोम',
                'मङ्गल',
                'बुध',
                'बिही',
                'शुक्र',
                'शनि'
            ],
            months: [
                'जनवरी',
                'फेब्रुअरी',
                'मार्च',
                'अप्रिल',
                'मे',
                'जून',
                'जुलाई',
                'अगस्त',
                'सेप्टेम्बर',
                'अक्टोबर',
                'नोभेम्बर',
                'डिसेम्बर'
            ]
        },
        fy: { // Frisian
            today: 'hjoed',
            weekdays: [
                'Sn',
                'Mo',
                'Ti',
                'Wo',
                'To',
                'Fr',
                'Sn'
            ],
            months: [
                'jannewaris',
                'febrewaris',
                'maart',
                'april',
                'maaie',
                'juny',
                'july',
                'augustus',
                'septimber',
                'oktober',
                'novimber',
                'desimber'
            ]
        },
        ps: { // Pashto
            today: 'نن ورځ',
            weekdays: [
                'الأحد',
                'الإثنين',
                'الثلاثاء',
                'الأربعاء',
                'الخميس',
                'الجمعة',
                'السبت'
            ],
            months: [
                'محرم',
                'صفر',
                'ربيع الأول',
                'ربيع الثاني',
                'جمادى الأولى',
                'جمادى الثانية',
                'رجب',
                'شعبان',
                'رمضان',
                'شوال',
                'ذو القعدة',
                'ذو الحجة'
            ]
        },
        fil: { // Filipino
            today: 'ngayon',
            weekdays: [
                'Lin',
                'Lun',
                'Mar',
                'Mier',
                'Hueb',
                'Bier',
                'Saba'
            ],
            months: [
                'Enero',
                'Pebrero',
                'Marso',
                'Abril',
                'Mayo',
                'Hunyo',
                'Hulyo',
                'Agosto',
                'Septyembre',
                'Oktubre',
                'Nobyembre',
                'Disyembre'
            ]
        },
        dv: { // Divehi
            today: 'މިއަދު',
            weekdays: [
                'އާދީއްތަ',
                'ހޯމަ',
                'އަންގާރަ',
                'ބުދަ',
                'ބުރާސްފަތި',
                'ހުކުރު',
                'ހޮނިހިރު'
            ],
            months: [
                'މުޙައްރަމް',
                'ޞަފަރު',
                'ރަބީޢުލްއައްވަލް',
                'ރަބީޢުލްއާޚިރު',
                'ޖުމާދަލްއޫލާ',
                'ޖުމާދަލްއާޚިރާ',
                'ރަޖަބް',
                'ޝަޢްބާން',
                'ރަމަޟާން',
                'ޝައްވާލް',
                'ޛުލްޤަޢިދާ',
                'ޛުލްޙިއްޖާ'
            ]
        },
        ha: { // Hausa
            today: 'yau',
            weekdays: [
                'Lah',
                'Lit',
                'Tal',
                'Lar',
                'Alh',
                'Jum',
                'Asa'
            ],
            months: [
                'Januwaru',
                'Febreru',
                'Maris',
                'Afrilu',
                'Mayu',
                'Yuni',
                'Yuli',
                'Agusta',
                'Satumba',
                'Oktocba',
                'Nuwamba',
                'Disamba'
            ]
        },
        yo: { // Yoruba
            today: 'loni',
            weekdays: [
                'Aik',
                'Aje',
                'Ise',
                'Ojo',
                'Ojo',
                'Eti',
                'Aba'
            ],
            months: [
                'Osu kinni',
                'Osu keji',
                'Osu keta',
                'Osu kerin',
                'Osu karun',
                'Osu kefa',
                'Osu keje',
                'Osu kejo',
                'Osu kesan',
                'Osu kewa',
                'Osu kokanla',
                'Osu keresi'
            ]
        },
        quz: { // Quechua
            today: 'kunan',
            weekdays: [
                'int',
                'kil',
                'ati',
                'quy',
                'Ch\'',
                'Ill',
                'k\'u'
            ],
            months: [
                'Qulla puquy',
                'Hatun puquy',
                'Pauqar waray',
                'ayriwa',
                'Aymuray',
                'Inti raymi',
                'Anta Sitwa',
                'Qhapaq Sitwa',
                'Uma raymi',
                'Kantaray',
                'Ayamarq\'a',
                'Kapaq Raymi'
            ]
        },
        nso: { // Sesotho sa Leboa
            today: 'Lehono',
            weekdays: [
                'Lam',
                'Moš',
                'Lbb',
                'Lbr',
                'Lbn',
                'Lbh',
                'Mok'
            ],
            months: [
                'Pherekgong',
                'Hlakola',
                'Mopitlo',
                'Moranang',
                'Mosegamanye',
                'Ngoatobošego',
                'Phuphu',
                'Phato',
                'Lewedi',
                'Diphalana',
                'Dibatsela',
                'Manthole'
            ]
        },
        ba: { // Bashkir
            today: 'бөгөн',
            weekdays: [
                'Йш',
                'Дш',
                'Шш',
                'Шр',
                'Кс',
                'Йм',
                'Шб'
            ],
            months: [
                'ғинуар',
                'февраль',
                'март',
                'апрель',
                'май',
                'июнь',
                'июль',
                'август',
                'сентябрь',
                'октябрь',
                'ноябрь',
                'декабрь'
            ]
        },
        lb: { // Luxembourgish
            today: 'haut',
            weekdays: [
                'Son',
                'Méi',
                'Dën',
                'Mët',
                'Don',
                'Fre',
                'Sam'
            ],
            months: [
                'Januar',
                'Februar',
                'Mäerz',
                'Abrëll',
                'Mee',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Dezember'
            ]
        },
        kl: { // Greenlandic
            today: 'ullumi',
            weekdays: [
                'sap',
                'ata',
                'mar',
                'ping',
                'sis',
                'tal',
                'arf'
            ],
            months: [
                'januari',
                'februari',
                'martsi',
                'apriili',
                'maaji',
                'juni',
                'juli',
                'aggusti',
                'septembari',
                'oktobari',
                'novembari',
                'decembari'
            ]
        },
        ig: { // Igbo
            today: 'taa',
            weekdays: [
                'Aik',
                'Aje',
                'Ise',
                'Ojo',
                'Ojo',
                'Eti',
                'Aba'
            ],
            months: [
                'Onwa mbu',
                'Onwa ibua',
                'Onwa ato',
                'Onwa ano',
                'Onwa ise',
                'Onwa isi',
                'Onwa asa',
                'Onwa asato',
                'Onwa itolu',
                'Onwa iri',
                'Onwa iri n\'ofu',
                'Onwa iri n\'ibua'
            ]
        },
        ii: { // Yi
            today: 'ꀃꑍ',
            weekdays: [
                'ꑭꆏ',
                'ꆏ꒔',
                'ꆏꑍ',
                'ꆏꌕ',
                'ꆏꇖ',
                'ꆏꉬ',
                'ꆏꃘ'
            ],
            months: [
                'ꋍꆪ',
                'ꑍꆪ',
                'ꌕꆪ',
                'ꇖꆪ',
                'ꉬꆪ',
                'ꃘꆪ',
                'ꏃꆪ',
                'ꉆꆪ',
                'ꈬꆪ',
                'ꊰꆪ',
                'ꊯꊪꆪ',
                'ꊰꑋꆪ'
            ]
        },
        arn: { // Mapudungun
            today: 'fachantü',
            weekdays: [
                'dom',
                'lun',
                'mar',
                'mié',
                'jue',
                'vie',
                'sáb'
            ],
            months: [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre'
            ]
        },
        moh: { // Mohawk
            today: 'okàra',
            weekdays: [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ],
            months: [
                'Tsothohrkó:Wa',
                'Enniska',
                'Enniskó:Wa',
                'Onerahtókha',
                'Onerahtohkó:Wa',
                'Ohiari:Ha',
                'Ohiarihkó:Wa',
                'Seskéha',
                'Seskehkó:Wa',
                'Kenténha',
                'Kentenhkó:Wa',
                'Tsothóhrha'
            ]
        },
        br: { // Breton
            today: 'hiziv',
            weekdays: [
                'Sul',
                'Lun',
                'Meu.',
                'Mer.',
                'Yaou',
                'Gwe.',
                'Sad.'
            ],
            months: [
                'Genver',
                'C\'hwevrer',
                'Meurzh',
                'Ebrel',
                'Mae',
                'Mezheven',
                'Gouere',
                'Eost',
                'Gwengolo',
                'Here',
                'Du',
                'Kerzu'
            ]
        },
        ug: { // Uyghur
            today: 'bügün',
            weekdays: [
                'يە',
                'دۈ',
                'سە',
                'چا',
                'پە',
                'جۈ',
                'شە'
            ],
            months: [
                '1-ئاي',
                '2-ئاي',
                '3-ئاي',
                '4-ئاي',
                '5-ئاي',
                '6-ئاي',
                '7-ئاي',
                '8-ئاي',
                '9-ئاي',
                '10-ئاي',
                '11-ئاي',
                '12-ئاي'
            ]
        },
        mi: { // Maori
            today: 'i tenei ra',
            weekdays: [
                'Ta',
                'Hi',
                'Tū',
                'Apa',
                'Pa',
                'Me',
                'Ho'
            ],
            months: [
                'Kohi-tātea',
                'Hui-tanguru',
                'Poutū-te-rangi',
                'Paenga-whāwhā',
                'Haratua',
                'Pipiri',
                'Hōngongoi',
                'Here-turi-kōkā',
                'Mahuru',
                'Whiringa-ā-nuku',
                'Whiringa-ā-rangi',
                'Hakihea'
            ]
        },
        oc: { // Occitan
            today: 'uèi',
            weekdays: [
                'dim.',
                'lun.',
                'mar.',
                'mèc.',
                'jòu.',
                'ven.',
                'sab.'
            ],
            months: [
                'genier',
                'febrier',
                'març',
                'abril',
                'mai',
                'junh',
                'julh',
                'agost',
                'setembre',
                'octobre',
                'novembre',
                'desembre'
            ]
        },
        co: { // Corsican
            today: 'oghje',
            weekdays: [
                'dum.',
                'lun.',
                'mar.',
                'mer.',
                'ghj.',
                'ven.',
                'sab.'
            ],
            months: [
                'ghjennaghju',
                'ferraghju',
                'marzu',
                'aprile',
                'maghju',
                'ghjunghju',
                'lugliu',
                'aostu',
                'settembre',
                'ottobre',
                'nuvembre',
                'dicembre'
            ]
        },
        gsw: { // Alsatian
            today: 'heit',
            weekdays: [
                'Su.',
                'Mo.',
                'Di.',
                'Mi.',
                'Du.',
                'Fr.',
                'Sà.'
            ],
            months: [
                'Jänner',
                'Feverje',
                'März',
                'Àpril',
                'Mai',
                'Jüni',
                'Jüli',
                'Augscht',
                'September',
                'Oktower',
                'Nowember',
                'Dezember'
            ]
        },
        sah: { // Yakut
            today: 'bügün',
            weekdays: [
                'Бс',
                'Бн',
                'Оп',
                'Ср',
                'Чп',
                'Бт',
                'Сб'
            ],
            months: [
                'Тохсунньу',
                'Олунньу',
                'Кулун тутар',
                'Муус устар',
                'Ыам ыйа',
                'Бэс ыйа',
                'От ыйа',
                'Атырдьах ыйа',
                'Балаҕан ыйа',
                'Алтынньы',
                'Сэтинньи',
                'Ахсынньы'
            ]
        },
        qut: { // K'iche
            today: '[kamik]',
            weekdays: [
                'juq',
                'kaq',
                'oxq',
                'kajq',
                'joq',
                'waqq',
                'wuqq'
            ],
            months: [
                'nab\'e ik\'',
                'ukab\' ik\'',
                'rox ik\'',
                'ukaj ik\'',
                'uro\' ik\'',
                'uwaq ik\'',
                'uwuq ik\'',
                'uwajxaq ik\'',
                'ub\'elej ik\'',
                'ulaj ik\'',
                'ujulaj ik\'',
                'ukab\'laj ik\''
            ]
        },
        rw: { // Kinyarwanda
            today: 'uyu munsi',
            weekdays: [
                'mbe.',
                'kab.',
                'gat.',
                'kan.',
                'gat.',
                'gat.',
                'cyu.'
            ],
            months: [
                'Mutarama',
                'Gashyantare',
                'Werurwe',
                'Mata',
                'Gicurasi',
                'Kamena',
                'Nyakanga',
                'Kanama',
                'Nzeli',
                'Ukwakira',
                'Ugushyingo',
                'Ukuboza'
            ]
        },
        wo: { // Wolof
            today: 'tey',
            weekdays: [
                'dim.',
                'lun.',
                'mar.',
                'mer.',
                'jeu.',
                'ven.',
                'sam.'
            ],
            months: [
                'janvier',
                'février',
                'mars',
                'avril',
                'mai',
                'juin',
                'juillet',
                'août',
                'septembre',
                'octobre',
                'novembre',
                'décembre'
            ]
        },
        prs: { // Dari
            today: 'امروز',
            weekdays: [
                'الأحد',
                'الإثنين',
                'الثلاثاء',
                'الأربعاء',
                'الخميس',
                'الجمعة',
                'السبت'
            ],
            months: [
                'محرم',
                'صفر',
                'ربيع الأول',
                'ربيع الثاني',
                'جمادى الأولى',
                'جمادى الثانية',
                'رجب',
                'شعبان',
                'رمضان',
                'شوال',
                'ذو القعدة',
                'ذو الحجة'
            ]
        },
        gd: { // Scottish Gaelic
            today: 'an-diugh',
            weekdays: [
                'Dòm',
                'Lua',
                'Mài',
                'Cia',
                'Ard',
                'Hao',
                'Sat'
            ],
            months: [
                'Am Faoilleach',
                'An Gearran',
                'Am Màrt',
                'An Giblean',
                'An Cèitean',
                'An t-Ògmhios',
                'An t-Iuchar',
                'An Lùnastal',
                'An t-Sultain',
                'An Dàmhair',
                'An t-Samhain',
                'An Dùbhlachd'
            ]
        },
        smn: { // Sami (Inari)
            today: 'onne',
            weekdays: [
                'pa',
                'vu',
                'ma',
                'ko',
                'tu',
                'vá',
                'lá'
            ],
            months: [
                'uđđâivemáánu',
                'kuovâmáánu',
                'njuhčâmáánu',
                'cuáŋuimáánu',
                'vyesimáánu',
                'kesimáánu',
                'syeinimáánu',
                'porgemáánu',
                'čohčâmáánu',
                'roovvâdmáánu',
                'skammâmáánu',
                'juovlâmáánu'
            ]
        },
        sms: { // Sami (Skolt)
            today: 'pei ́vv',
            weekdays: [
                'pâ',
                'vu',
                'mâ',
                'se',
                'ne',
                'pi',
                'su'
            ],
            months: [
                'ođđee´jjmään',
                'tä´lvvmään',
                'pâ´zzlâšttammään',
                'njuhččmään',
                'vue´ssmään',
                'ǩie´ssmään',
                'suei´nnmään',
                'på´rǧǧmään',
                'čõhččmään',
                'kålggmään',
                'skamm´mään',
                'rosttovmään'
            ]
        },
        zh: { // Simplified Chinese 
            weekdays: [
                '星期天',
                '星期一',
                '星期二',
                '星期三',
                '星期四',
                '星期五',
                '星期六'
            ],
            months: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ],
            today: '今天',
        },
        'zh-hans': { //Simplified Chinese, informal
            weekdays: [
                '周日',
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六'
            ],
            months: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ],
            today: '今天',
        },
        'zh-hant': { // Traditional Chinese
            weekdays: [
                '週日',
                '週一',
                '週二',
                '週三',
                '週四',
                '週五',
                '週六'
            ],
            months: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ],
            today: '今天',
        },
        nn: { // Norwegian (Nynorsk)
            today: 'i dag',
            weekdays: [
                'sø',
                'må',
                'ty',
                'on',
                'to',
                'fr',
                'la'
            ],
            months: [
                'januar',
                'februar',
                'mars',
                'april',
                'mai',
                'juni',
                'juli',
                'august',
                'september',
                'oktober',
                'november',
                'desember'
            ]
        },
        bs: { // Bosnian
            today: 'danas',
            weekdays: [
                'ned',
                'pon',
                'uto',
                'sri',
                'čet',
                'pet',
                'sub'
            ],
            months: [
                'januar',
                'februar',
                'mart',
                'april',
                'maj',
                'juni',
                'juli',
                'avgust',
                'septembar',
                'oktobar',
                'novembar',
                'decembar'
            ]
        },
        sma: { // Sami (Southern)
            today: 'daenbiejjien',
            weekdays: [
                'aej',
                'måa',
                'dæj',
                'gask',
                'duar',
                'bearj',
                'laav'
            ],
            months: [
                'tsïengele',
                'goevte',
                'njoktje',
                'voerhtje',
                'suehpede',
                'ruffie',
                'snjaltje',
                'mïetske',
                'skïerede',
                'golke',
                'rahka',
                'goeve'
            ]
        },
        nb: { // Norwegian (Bokmål)
            today: 'i dag',
            weekdays: [
                'sø',
                'ma',
                'ti',
                'on',
                'to',
                'fr',
                'lø'
            ],
            months: [
                'januar',
                'februar',
                'mars',
                'april',
                'mai',
                'juni',
                'juli',
                'august',
                'september',
                'oktober',
                'november',
                'desember'
            ]
        },
        sr: { // Serbian
            today: 'данас',
            weekdays: [
                'ned',
                'pon',
                'uto',
                'sre',
                'čet',
                'pet',
                'sub'
            ],
            months: [
                'januar',
                'februar',
                'mart',
                'april',
                'maj',
                'jun',
                'jul',
                'avgust',
                'septembar',
                'oktobar',
                'novembar',
                'decembar'
            ]
        },
        dsb: { // Lower Sorbian
            today: 'źinsa',
            weekdays: [
                'nje',
                'pon',
                'wał',
                'srj',
                'stw',
                'pět',
                'sob'
            ],
            months: [
                'januar',
                'februar',
                'měrc',
                'apryl',
                'maj',
                'junij',
                'julij',
                'awgust',
                'september',
                'oktober',
                'nowember',
                'december'
            ]
        },
        smj: { // Sami (Lule)
            today: 'uddni',
            weekdays: [
                'ájl',
                'mán',
                'dis',
                'gas',
                'duor',
                'bier',
                'láv'
            ],
            months: [
                'ådåjakmánno',
                'guovvamánno',
                'sjnjuktjamánno',
                'vuoratjismánno',
                'moarmesmánno',
                'biehtsemánno',
                'sjnjilltjamánno',
                'bårggemánno',
                'ragátmánno',
                'gålgådismánno',
                'basádismánno',
                'javllamánno'
            ]
        }
    };
}