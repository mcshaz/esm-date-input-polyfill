import './esm-date-input-polyfill.scss';

class Picker {
  constructor({yrsBack = 80, yrsFwd = 20} = {yrsBack: 80, yrsFwd: 20}) {
    // This is a singleton.
    if(Picker.instance) {
      return Picker.instance;
    }

    const passiveOpt = { passive: true };

    this.date = new Date();
    this.input = null;
    this.isOpen = false;
    this._onBeforeOpen = [];

    // The picker element. Unique tag name attempts to protect against
    // generic selectors.
    this.container = document.createElement(`date-input-polyfill`);

    // Add controls.
    // Year picker.
    this.year = document.createElement('select');
    Picker.createRangeSelect(
      this.year,
      this.date.getFullYear() - yrsBack,
      this.date.getFullYear() + yrsFwd,
    );
    this.year.className = 'yearSelect';
    this.year.addEventListener('change', ()=> {
      this.date.setYear(this.year.value);
      this.refreshDaysMatrix();
    }, passiveOpt);
    this.container.appendChild(this.year);

    // Month picker.
    this.month = document.createElement('select');
    this.month.className = 'monthSelect';
    this.month.addEventListener('change', ()=> {
      this.date.setMonth(this.month.value);
      this.refreshDaysMatrix();
    }, passiveOpt);
    this.container.appendChild(this.month);

    // Today button.
    this.today = document.createElement('button');
    this.today.textContent = 'Today';
    this.today.addEventListener('click', ()=> {
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
    this.days.addEventListener('click', (e) => {
      const tgt = e.target;

      if(!tgt.classList.contains('esm-polyfill-day') || tgt.classList.contains('esm-polyfill-invalid-day')) {
        return false;
      }

      const curSel = this.days.querySelector('.esm-polyfill-day-selected');
      if(curSel) {
        curSel.classList.remove('esm-polyfill-day-selected');
      }
      tgt.classList.add('esm-polyfill-day-selected');

      this.date.setDate(parseInt(tgt.textContent, 10));
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
        this.hide()
      }
    }, passiveOpt);
  }

  // Hide.
  hide() {
    this.container.setAttribute('data-open', this.isOpen = false);
  }

  // Show.
  show() {
    this._onBeforeOpen.forEach((fn) => fn());
    this.container.setAttribute('data-open', this.isOpen = true);
  }

  onBeforeOpen(fn) {
    this._onBeforeOpen.push(fn);
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
      this.date = Picker.utcDateToLocal(this.input.element.valueAsDate);
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
    let startDate = new Date(year, month, 1);
    const startDay = startDate.getDay(); // First weekday of month (0-6).
    const daysInMonth = new Date(
      this.date.getFullYear(),
      month + 1,
      0
    ).getDate(); // Get days in month (1-31).

    // The input's current date.
    const selDate = Picker.utcDateToLocal(this.input.element.valueAsDate) || false;

    // Are we in the input's currently-selected month and year?
    const selMatrix =
      selDate
      && year === selDate.getFullYear()
      && month === selDate.getMonth();

    const minStr = this.input.element.min;
    const minTime = minStr
      ? Picker.utcDateToLocal(new Date(minStr)).getTime()
      : -30610224000000; // 1000-01-01
    const maxStr = this.input.element.max;
    const maxTime = maxStr
      ? Picker.utcDateToLocal(new Date(maxStr)).getTime()
      : 32503680000000; // 3000-01-01

    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const currentTime= currentDate.getTime();

    // Populate days matrix.
    const matrixHTML = [];
    for(let i = 0; i < daysInMonth + startDay; ++i) {
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
      const classList = ['esm-polyfill-day'];
      if (selMatrix && selDate.getDate() === dayNum){
        classList.push('esm-polyfill-day-selected');
      }
      let thisTime = startDate.setDate(dayNum);
      if (thisTime < minTime || thisTime > maxTime) {
        console.log({min: new Date(minTime), max: new Date(maxTime), current: new Date(thisTime)})
        classList.push('esm-polyfill-invalid-day');
      };
      if (thisTime === currentTime) {
        classList.push('esm-polyfill-current-day');
      }

      matrixHTML.push(
        `<td class="${classList.join(' ')}">
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
        aOption.selected = 'selected';
      }
    }

    return theSelect;
  }

  static utcDateToLocal(date) {
    return date && new Date(date.getTime() + date.getTimezoneOffset()*60000);
  }
}

Picker.instance = null;

export default Picker;
