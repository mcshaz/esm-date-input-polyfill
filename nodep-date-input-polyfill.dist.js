(function (factory) {
  typeof define === 'function' && define.amd ? define(['core-js/modules/es.array.concat', 'core-js/modules/es.array.join', 'core-js/modules/es.array.slice', 'core-js/modules/es.date.to-string', 'core-js/modules/es.parse-int', 'core-js/modules/es.array.for-each', 'core-js/modules/es.array.map', 'core-js/modules/es.date.to-iso-string', 'core-js/modules/es.object.define-properties', 'core-js/modules/es.object.keys', 'core-js/modules/es.regexp.exec', 'core-js/modules/es.string.replace', 'core-js/modules/es.string.split', 'core-js/modules/web.dom-collections.for-each'], factory) :
  factory();
}((function () { 'use strict';

  function ___$insertStyle(css) {
    if (!css) {
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }

    var style = document.createElement('style');

    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
  }

  ___$insertStyle("date-input-polyfill {\n  background: #fff;\n  color: #000;\n  text-shadow: none;\n  border: 0;\n  padding: 0;\n  height: auto;\n  width: auto;\n  line-height: normal;\n  border-radius: 0;\n  font-family: sans-serif;\n  font-size: 14px;\n  position: absolute !important;\n  text-align: center;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12);\n  cursor: default;\n  z-index: 1;\n}\ndate-input-polyfill[data-open=false] {\n  display: none;\n}\ndate-input-polyfill[data-open=true] {\n  display: block;\n}\ndate-input-polyfill select, date-input-polyfill table, date-input-polyfill th, date-input-polyfill td {\n  background: #fff;\n  color: #000;\n  text-shadow: none;\n  border: 0;\n  padding: 0;\n  height: auto;\n  width: auto;\n  line-height: normal;\n  border-radius: 0;\n  font-family: sans-serif;\n  font-size: 14px;\n  box-shadow: none;\n}\ndate-input-polyfill select, date-input-polyfill button {\n  border: 0;\n  border-bottom: 1px solid #E0E0E0;\n  height: 24px;\n  vertical-align: top;\n}\ndate-input-polyfill select {\n  width: 50%;\n}\ndate-input-polyfill select:first-of-type {\n  border-right: 1px solid #E0E0E0;\n  width: 30%;\n}\ndate-input-polyfill button {\n  padding: 0;\n  width: 20%;\n  background: #E0E0E0;\n}\ndate-input-polyfill table {\n  border-collapse: collapse;\n}\ndate-input-polyfill th, date-input-polyfill td {\n  width: 32px;\n  padding: 4px;\n  text-align: center;\n}\ndate-input-polyfill td[data-day] {\n  cursor: pointer;\n}\ndate-input-polyfill td[data-day]:hover {\n  background: #E0E0E0;\n}\ndate-input-polyfill [data-selected] {\n  font-weight: bold;\n  background: #D8EAF6;\n}\n\ninput[data-has-picker]::-ms-clear {\n  display: none;\n}");

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Picker =
  /*#__PURE__*/
  function () {
    function Picker() {
      var _this = this;

      _classCallCheck(this, Picker);

      // This is a singleton.
      if (Picker.instance) {
        return Picker.instance;
      }

      this.date = new Date();
      this.input = null;
      this.isOpen = false; // The picker element. Unique tag name attempts to protect against
      // generic selectors.

      this.container = document.createElement("date-input-polyfill"); // Add controls.
      // Year picker.

      this.year = document.createElement("select");
      Picker.createRangeSelect(this.year, this.date.getFullYear() - 80, this.date.getFullYear() + 20);
      this.year.className = "yearSelect";
      this.year.addEventListener("change", function () {
        _this.date.setYear(_this.year.value);

        _this.refreshDaysMatrix();
      });
      this.container.appendChild(this.year); // Month picker.

      this.month = document.createElement("select");
      this.month.className = "monthSelect";
      this.month.addEventListener("change", function () {
        _this.date.setMonth(_this.month.value);

        _this.refreshDaysMatrix();
      });
      this.container.appendChild(this.month); // Today button.

      this.today = document.createElement("button");
      this.today.textContent = "Today";
      this.today.addEventListener("click", function () {
        _this.date = new Date();

        _this.setInput();
      });
      this.container.appendChild(this.today); // Setup unchanging DOM for days matrix.

      var daysMatrix = document.createElement("table");
      this.daysHead = document.createElement("thead");
      this.days = document.createElement("tbody"); // THIS IS THE BIG PART.
      // When the user clicks a day, set that day as the date.
      // Uses event delegation.

      this.days.addEventListener("click", function (e) {
        var tgt = e.target;

        if (!tgt.hasAttribute("data-day")) {
          return false;
        }

        var curSel = _this.days.querySelector("[data-selected]");

        if (curSel) {
          curSel.removeAttribute("data-selected");
        }

        tgt.setAttribute("data-selected", "");

        _this.date.setDate(parseInt(tgt.textContent));

        _this.setInput();
      });
      daysMatrix.appendChild(this.daysHead);
      daysMatrix.appendChild(this.days);
      this.container.appendChild(daysMatrix);
      this.hide();
      document.body.appendChild(this.container); // Close the picker when clicking outside of a date input or picker.

      document.addEventListener("click", function (e) {
        var el = e.target;
        var isPicker = el === _this.container;

        while (!isPicker && (el = el.parentNode)) {
          isPicker = el === _this.container;
        }

        e.target.getAttribute("type") !== "date" && !isPicker && _this.hide();
      });
    } // Hide.


    _createClass(Picker, [{
      key: "hide",
      value: function hide() {
        this.container.setAttribute("data-open", this.isOpen = false);
      } // Show.

    }, {
      key: "show",
      value: function show() {
        this.container.setAttribute("data-open", this.isOpen = true);
      } // Position picker below element. Align to element's left edge.

    }, {
      key: "goto",
      value: function goto(element) {
        var rekt = element.getBoundingClientRect();
        this.container.style.top = "".concat(rekt.top + rekt.height + (document.documentElement.scrollTop || document.body.scrollTop), "px");
        this.container.style.left = "".concat(rekt.left + (document.documentElement.scrollLeft || document.body.scrollLeft), "px");
        this.show();
      } // Initiate I/O with given date input.

    }, {
      key: "attachTo",
      value: function attachTo(input) {
        if (input === this.input && this.isOpen) {
          return false;
        }

        this.input = input;
        this.sync();
        this.goto(this.input.element);
      } // Match picker date with input date.

    }, {
      key: "sync",
      value: function sync() {
        if (this.input.element.valueAsDate) {
          this.date = Picker.absoluteDate(this.input.element.valueAsDate);
        } else {
          this.date = new Date();
        }

        this.year.value = this.date.getFullYear();
        this.month.value = this.date.getMonth();
        this.refreshDaysMatrix();
      } // Match input date with picker date.

    }, {
      key: "setInput",
      value: function setInput() {
        var _this2 = this;

        this.input.element.value = "".concat(this.date.getFullYear(), "-").concat("0".concat(this.date.getMonth() + 1).slice(-2), "-").concat("0".concat(this.date.getDate()).slice(-2));
        this.input.element.focus();
        setTimeout(function () {
          // IE wouldn't hide, so in a timeout you go.
          _this2.hide();
        }, 100);
        this.pingInput();
      }
    }, {
      key: "refreshLocale",
      value: function refreshLocale() {
        if (this.locale === this.input.locale) {
          return false;
        }

        this.locale = this.input.locale;
        var daysHeadHTML = ["<tr>"];

        for (var i = 0, len = this.input.localeText.days.length; i < len; ++i) {
          daysHeadHTML.push("<th scope=\"col\">".concat(this.input.localeText.days[i], "</th>"));
        }

        this.daysHead.innerHTML = daysHeadHTML.join("");
        Picker.createRangeSelect(this.month, 0, 11, this.input.localeText.months, this.date.getMonth());
        this.today.textContent = this.input.localeText.today;
      }
    }, {
      key: "refreshDaysMatrix",
      value: function refreshDaysMatrix() {
        this.refreshLocale(); // Determine days for this month and year,
        // as well as on which weekdays they lie.

        var year = this.date.getFullYear(); // Get the year (2016).

        var month = this.date.getMonth(); // Get the month number (0-11).

        var startDay = new Date(year, month, 1).getDay(); // First weekday of month (0-6).

        var maxDays = new Date(this.date.getFullYear(), month + 1, 0).getDate(); // Get days in month (1-31).
        // The input's current date.

        var selDate = Picker.absoluteDate(this.input.element.valueAsDate) || false; // Are we in the input's currently-selected month and year?

        var selMatrix = selDate && year === selDate.getFullYear() && month === selDate.getMonth(); // Populate days matrix.

        var matrixHTML = [];

        for (var i = 0; i < maxDays + startDay; ++i) {
          // Add a row every 7 days.
          if (i % 7 === 0) {
            matrixHTML.push("\n          ".concat(i !== 0 ? "</tr>" : "", "\n          <tr>\n        "));
          } // Add new column.
          // If no days from this month in this column, it will be empty.


          if (i + 1 <= startDay) {
            matrixHTML.push("<td></td>");
            continue;
          } // Populate day number.


          var dayNum = i + 1 - startDay;
          var selected = selMatrix && selDate.getDate() === dayNum;
          matrixHTML.push("<td data-day ".concat(selected ? "data-selected" : "", ">\n          ").concat(dayNum, "\n        </td>"));
        }

        this.days.innerHTML = matrixHTML.join("");
      }
    }, {
      key: "pingInput",
      value: function pingInput() {
        // Dispatch DOM events to the input.
        var inputEvent;
        var changeEvent; // Modern event creation.

        try {
          inputEvent = new Event("input");
          changeEvent = new Event("change");
        } // Old-fashioned way.
        catch (e) {
          inputEvent = document.createEvent("KeyboardEvent");
          inputEvent.initEvent("input", true, false);
          changeEvent = document.createEvent("KeyboardEvent");
          changeEvent.initEvent("change", true, false);
        }

        this.input.element.dispatchEvent(inputEvent);
        this.input.element.dispatchEvent(changeEvent);
      }
    }], [{
      key: "createRangeSelect",
      value: function createRangeSelect(theSelect, min, max, namesArray, selectedValue) {
        theSelect.innerHTML = "";

        for (var i = min; i <= max; ++i) {
          var aOption = document.createElement("option");
          theSelect.appendChild(aOption);
          var theText = namesArray ? namesArray[i - min] : i;
          aOption.text = theText;
          aOption.value = i;

          if (i === selectedValue) {
            aOption.selected = "selected";
          }
        }

        return theSelect;
      }
    }, {
      key: "absoluteDate",
      value: function absoluteDate(date) {
        return date && new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
      }
    }]);

    return Picker;
  }();

  Picker.instance = null;

  // Localizations for UI text.
  // Keys correspond to applicable `lang` values, delimited by an underscore.
  // Days and months must be listed in the order they should display.
  var locales = {
    'en_en-US': {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      today: "Today",
      format: "M/D/Y"
    },
    'en-GB_en-AU_en-NZ': {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      today: "Today",
      format: "D/M/Y"
    },

    /* Simplified Chinese */
    'zh_zh-CN': {
      days: ["\u661F\u671F\u5929", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"],
      months: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
      today: "\u4ECA\u5929",
      format: "Y/M/D"
    },

    /* Simplified Chinese, informal*/
    'zh-Hans_zh-Hans-CN': {
      days: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
      months: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
      today: "\u4ECA\u5929",
      format: "Y/M/D"
    },

    /* Traditional Chinese */
    'zh-Hant_zh-Hant-TW': {
      days: ["\u9031\u65E5", "\u9031\u4E00", "\u9031\u4E8C", "\u9031\u4E09", "\u9031\u56DB", "\u9031\u4E94", "\u9031\u516D"],
      months: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
      today: "\u4ECA\u5929",
      format: "Y/M/D"
    },

    /* German (Germany) */
    'de_de-DE': {
      days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      months: ["Januar", "Februar", "M\xE4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      today: "Heute",
      format: "D.M.Y"
    },

    /* Danish */
    'da_da-DA': {
      days: ["S\xF8n", "Man", "Tirs", "Ons", "Tors", "Fre", "L\xF8r"],
      months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
      today: "I dag",
      format: "D/M/Y"
    },

    /* Spanish */
    'es': {
      days: ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"],
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      today: "Hoy",
      format: "D/M/Y"
    },

    /* Hindi */
    'hi': {
      days: ["\u0930\u0935\u093F", "\u0938\u094B\u092E", "\u092E\u0902\u0917\u0932", "\u092C\u0941\u0927", "\u0917\u0941\u0930\u0941", "\u0936\u0941\u0915\u094D\u0930", "\u0936\u0928\u093F"],
      months: ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0948", "\u091C\u0942\u0928", "\u091C\u0942\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0906\u0915\u094D\u091F\u094B\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"],
      today: "\u0906\u091C",
      format: "D/M/Y"
    },

    /* Portuguese */
    'pt': {
      days: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
      months: ["Janeiro", "Fevereiro", "Mar\xE7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      today: "Hoje",
      format: "D/M/Y"
    },

    /* Japanese */
    'ja': {
      days: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
      months: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
      today: "\u4ECA\u65E5",
      format: "Y/M/D"
    },

    /* Dutch */
    'nl_nl-NL_nl-BE': {
      days: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
      months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
      today: "Vandaag",
      format: "D/M/Y"
    },

    /* Turkish */
    'tr_tr-TR': {
      days: ["Pzr", "Pzt", "Sal", "\xC7r\u015F", "Pr\u015F", "Cum", "Cmt"],
      months: ["Ocak", "\u015Eubat", "Mart", "Nisan", "May\u0131s", "Haziran", "Temmuz", "A\u011Fustos", "Eyl\xFCl", "Ekim", "Kas\u0131m", "Aral\u0131k"],
      today: "Bug\xFCn",
      format: "D/M/Y"
    },

    /* French */
    'fr_fr-FR': {
      days: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      months: ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"],
      today: "Auj.",
      format: "D/M/Y"
    },

    /* Ukrainian */
    'uk_uk-UA': {
      days: ["\u041D\u0434", "\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431"],
      months: ["\u0421\u0456\u0447\u0435\u043D\u044C", "\u041B\u044E\u0442\u0438\u0439", "\u0411\u0435\u0440\u0435\u0437\u0435\u043D\u044C", "\u041A\u0432\u0456\u0442\u0435\u043D\u044C", "\u0422\u0440\u0430\u0432\u0435\u043D\u044C", "\u0427\u0435\u0440\u0432\u0435\u043D\u044C", "\u041B\u0438\u043F\u0435\u043D\u044C", "\u0421\u0435\u0440\u043F\u0435\u043D\u044C", "\u0412\u0435\u0440\u0435\u0441\u0435\u043D\u044C", "\u0416\u043E\u0432\u0442\u0435\u043D\u044C", "\u041B\u0438\u0441\u0442\u043E\u043F\u0430\u0434", "\u0413\u0440\u0443\u0434\u0435\u043D\u044C"],
      today: "\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456",
      format: "D.M.Y"
    },

    /* Italian */
    'it': {
      days: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "ottobre", "Novembre", "Dicembre"],
      today: "Oggi",
      format: "D/M/Y"
    },

    /* Polish */
    'pl': {
      days: ["Nie", "Pon", "Wto", "\u015Aro", "Czw", "Pt", "Sob"],
      months: ["Stycze\u0144", "Luty", "Marzec", "Kwiecie\u0144", "Maj", "Czerwiec", "Lipiec", "Sierpie\u0144", "Wrzesie\u0144", "Pa\u017Adziernik", "Listopad", "Grudzie\u0144"],
      today: "Dzisiaj",
      format: "D.M.Y"
    },

    /* Czech */
    'cs': {
      days: ["Po", "\xDAt", "St", "\u010Ct", "P\xE1", "So", "Ne"],
      months: ["Leden", "\xDAnor", "B\u0159ezen", "Duben", "Kv\u011Bten", "\u010Cerven", "\u010Cervenec", "Srpen", "Z\xE1\u0159\xED", "\u0158\xEDjen", "Listopad", "Prosinec"],
      today: "Dnes",
      format: "D.M.Y"
    },

    /* Russian */
    'ru': {
      days: ["\u0412\u0441", "\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431"],
      months: ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439", "\u0418\u044E\u043D\u044C", "\u0418\u044E\u043B\u044C", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"],
      today: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F",
      format: "D.M.Y"
    }
  };

  var Input =
  /*#__PURE__*/
  function () {
    function Input(input) {
      var _this = this;

      _classCallCheck(this, Input);

      this.element = input;
      this.element.setAttribute("data-has-picker", "");
      var langEl = this.element,
          lang = "";

      while (langEl.parentNode) {
        lang = langEl.getAttribute("lang");

        if (lang) {
          break;
        }

        langEl = langEl.parentNode;
      }

      this.setLocaleText(lang);
      Object.defineProperties(this.element, {
        'value': {
          get: function get() {
            return _this.element.polyfillValue;
          },
          set: function set(val) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
              _this.element.polyfillValue = "";

              _this.element.setAttribute("value", "");

              return false;
            }

            _this.element.polyfillValue = val;
            var YMD = val.split("-");

            _this.element.setAttribute("value", _this.localeText.format.replace("Y", YMD[0]).replace("M", YMD[1]).replace("D", YMD[2]));
          }
        },
        'valueAsDate': {
          get: function get() {
            if (!_this.element.polyfillValue) {
              return null;
            }

            return new Date(_this.element.polyfillValue);
          },
          set: function set(val) {
            _this.element.value = val.toISOString().slice(0, 10);
          }
        },
        'valueAsNumber': {
          get: function get() {
            if (!_this.element.value) {
              return NaN;
            }

            return _this.element.valueAsDate.getTime();
          },
          set: function set(val) {
            _this.element.valueAsDate = new Date(val);
          }
        }
      }); // Initialize value for display.

      this.element.value = this.element.getAttribute("value"); // Open the picker when the input get focus,
      // also on various click events to capture it in all corner cases.

      var showPicker = function showPicker() {
        Picker.instance.attachTo(_this);
      };

      this.element.addEventListener("focus", showPicker);
      this.element.addEventListener("mousedown", showPicker);
      this.element.addEventListener("mouseup", showPicker); // Update the picker if the date changed manually in the input.

      this.element.addEventListener("keydown", function (e) {
        var date = new Date();

        switch (e.keyCode) {
          case 27:
            Picker.instance.hide();
            break;

          case 38:
            if (_this.element.valueAsDate) {
              date.setDate(_this.element.valueAsDate.getDate() + 1);
              _this.element.valueAsDate = date;
              Picker.instance.pingInput();
            }

            break;

          case 40:
            if (_this.element.valueAsDate) {
              date.setDate(_this.element.valueAsDate.getDate() - 1);
              _this.element.valueAsDate = date;
              Picker.instance.pingInput();
            }

            break;
        }

        Picker.instance.sync();
      });
    }

    _createClass(Input, [{
      key: "setLocaleText",
      value: function setLocaleText(preference) {
        var supportedLocales = {}; // could use an ES map, but that would add a polyfill

        Object.keys(locales).forEach(function (ls) {
          ls.toLowerCase().split('_').forEach(function (l) {
            return supportedLocales[l] = locales[ls];
          });
        });
        var preferredLocales = (preference ? [preference] : []).concat(window.navigator.languages || [window.navigator.userLanguage || window.navigator.language]);
        preferredLocales = preferredLocales.map(function (l) {
          return l.toLowerCase();
        }); // First, look for an exact match to the provided locale.

        for (var pl in preferredLocales) {
          if (supportedLocales[pl]) {
            this.locale = pl;
            this.localeText = supportedLocales[pl];
            return;
          }
        }

        preferredLocales.push('en'); // If not found, look for a match to only the language.

        for (var _pl in preferredLocales) {
          var _lang = _pl.substring(0, 2);

          if (supportedLocales[_lang]) {
            this.locale = _lang;
            this.localeText = supportedLocales[_lang];
            return;
          }
        }
      } // Return false if the browser does not support input[type="date"].

    }], [{
      key: "supportsDateInput",
      value: function supportsDateInput() {
        var input = document.createElement("input");
        input.setAttribute("type", "date");
        var notADateValue = "not-a-date";
        input.setAttribute("value", notADateValue);
        return document.currentScript && !document.currentScript.hasAttribute("data-nodep-date-input-polyfill-debug") && !(input.value === notADateValue);
      } // Will add the Picker to all inputs in the page.

    }, {
      key: "addPickerToDateInputs",
      value: function addPickerToDateInputs() {
        // Get and loop all the input[type="date"]s in the page that do not have `[data-has-picker]` yet.
        var dateInputs = document.querySelectorAll("input[type=\"date\"]:not([data-has-picker]):not([readonly])");
        var length = dateInputs.length;

        if (!length) {
          return false;
        }

        for (var i = 0; i < length; ++i) {
          new Input(dateInputs[i]);
        }
      }
    }]);

    return Input;
  }();

  // Check if type="date" is supported.

  if (!Input.supportsDateInput()) {
    var init = function init() {
      Picker.instance = new Picker();
      Input.addPickerToDateInputs(); // This is also on mousedown event so it will capture new inputs that might
      // be added to the DOM dynamically.

      document.querySelector("body").addEventListener("mousedown", function () {
        Input.addPickerToDateInputs();
      });
    };

    if (document.readyState === "complete") {
      init();
    } else {
      var DOMContentLoaded = false;
      document.addEventListener("DOMContentLoaded", function () {
        DOMContentLoaded = true;
        init();
      });
      window.addEventListener("load", function () {
        if (!DOMContentLoaded) {
          init();
        }
      });
    }
  }

})));
