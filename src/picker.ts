import './esm-date-input-polyfill.scss';
import { LocaleDateInfo, LanguageDateNames } from './languages';
interface InputPolyfill extends LocaleDateInfo { element: HTMLInputElement }

export class Picker {
    public date: Date;
    public input: InputPolyfill | null;
    public isOpen: boolean;
    public year: HTMLSelectElement;
    public month: HTMLSelectElement;
    public today: HTMLButtonElement;
    public container: HTMLElement;
    public daysHead: HTMLTableSectionElement; // thead
    public days: HTMLTableSectionElement; // tbody

    private _locale?: LanguageDateNames;
    
    private _onBeforeOpen: Array<() => void> = [];

    private static _instance: Picker;
    
    private constructor({yrsBack = 80, yrsFwd = 20} = {yrsBack: 80, yrsFwd: 20}) {
    // This is a singleton.

        const passiveOpt = { passive: true };

        this.date = new Date();
        this.input = null;
        this.isOpen = false;
        this._onBeforeOpen = [];

        // The picker element. Unique tag name attempts to protect against
        // generic selectors.
        this.container = document.createElement('date-input-polyfill');

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
            this.date.setFullYear(Number(this.year.value));
            this.refreshDaysMatrix();
        }, passiveOpt);
        this.container.appendChild(this.year);

        // Month picker.
        this.month = document.createElement('select');
        this.month.className = 'monthSelect';
        this.month.addEventListener('change', ()=> {
            this.date.setMonth(Number(this.month.value));
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
        const daysMatrix = document.createElement('table');
        this.daysHead = document.createElement('thead');
        this.days = document.createElement('tbody');

        // THIS IS THE BIG PART.
        // When the user clicks a day, set that day as the date.
        // Uses event delegation.
        this.days.addEventListener('click', (e) => {
            const tgt = e.target as HTMLTableCellElement;

            if(!tgt.classList.contains('esm-polyfill-day') || tgt.classList.contains('esm-polyfill-invalid-day')) {
                return;
            }

            const curSel = this.days.querySelector('.esm-polyfill-day-selected');
            if(curSel) {
                curSel.classList.remove('esm-polyfill-day-selected');
            }
            tgt.classList.add('esm-polyfill-day-selected');

            this.date.setDate(Number(tgt.textContent));
            this.setInput();
        }, passiveOpt);

        daysMatrix.appendChild(this.daysHead);
        daysMatrix.appendChild(this.days);
        this.container.appendChild(daysMatrix);

        this.hide();
        document.body.appendChild(this.container);

        // Close the picker when clicking outside of a date input or picker.
        document.addEventListener('click', e=> {
            let el = e.target as Node | null;
            let isPicker = el === this.container;

            while(!isPicker && el) {
                isPicker = el === this.container;
                el = el.parentNode;
            }
            const attr = (e.target as HTMLElement).getAttribute('type');
            if (attr !== 'date' && attr !== 'date-polyfill' && !isPicker) {
                this.hide();
            }
        }, passiveOpt);
    }

    // Hide.
    hide() {
        this.container.setAttribute('data-open', String(this.isOpen = false));
    }

    // Show.
    show() {
        this._onBeforeOpen.forEach((fn) => fn());
        this.container.setAttribute('data-open', String(this.isOpen = true));
    }

    onBeforeOpen(fn: () => void) {
        this._onBeforeOpen.push(fn);
    }

    // Position picker below element. Align to element's left edge.
    goto(element: HTMLElement) {
        const rekt = element.getBoundingClientRect();
        this.container.style.top = rekt.top + rekt.height
            + (document.documentElement.scrollTop || document.body.scrollTop)
            + 'px';
        this.container.style.left = rekt.left
            + (document.documentElement.scrollLeft || document.body.scrollLeft)
            + 'px';

        this.show();
    }

    // Initiate I/O with given date input.
    attachTo(input: InputPolyfill) {
        if (input === this.input && this.isOpen) {
            return false;
        }

        this.input = input;
        this.sync();
        this.goto(this.input.element);
        return true;
    }

    // Match picker date with input date.
    sync() {
        if (!this.input) {
            throw new Error('You must attach the polyfilled input with attachTo before calling sync');
        }
        this.date = Picker.utcDateToLocal(this.input.element.valueAsNumber) || new Date();

        this.year.value = String(this.date.getFullYear());
        this.month.value = String(this.date.getMonth());
        this.refreshDaysMatrix();
    }

    // Match input date with picker date.
    setInput() {
        if (!this.input) {
            throw new Error('You must attach the polyfilled input with attachTo before calling setInput');
        }
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
        if(!this.input || this._locale === this.input.translation) {
            return false;
        }

        this._locale = this.input.translation;

        const daysHeadHTML = [
            '<tr>', 
            ...this.input.translation.weekdays.map((wd) => `<th scope="col">${wd}</th>`)
        ];
        this.daysHead.innerHTML = daysHeadHTML.join('');

        Picker.createRangeSelect(
            this.month,
            0,
            11,
            this.input.translation.months,
            this.date.getMonth()
        );

        this.today.textContent = this.input.translation.today;
        return true;
    }

    refreshDaysMatrix() {
        if (!this.input) {
            throw new Error('You must attach the polyfilled input with attachTo before calling refreshDaysMatrix');
        }
        this.refreshLocale();

        // Determine days for this month and year,
        // as well as on which weekdays they lie.
        const year = this.date.getFullYear(); // Get the year (2016).
        const month = this.date.getMonth(); // Get the month number (0-11).
        const startDate = new Date(year, month, 1);
        const startDay = startDate.getDay(); // First weekday of month (0-6).
        const daysInMonth = new Date(
            this.date.getFullYear(),
            month + 1,
            0
        ).getDate(); // Get days in month (1-31).

        // The input's current date.
        const selDate = Picker.utcDateToLocal(this.input.element.valueAsNumber);


        // Are we in the input's currently-selected month and year?
        const isSelectedYrMth =selDate && year === selDate.getFullYear()
            && month === selDate.getMonth();

        const minStr = this.input.element.min;
        const minTime = Picker.utcDateToLocal(minStr)?.getTime()
            || -30610224000000; // 1000-01-01
        const maxStr = this.input.element.max;
        const maxTime = Picker.utcDateToLocal(maxStr)?.getTime()
            || 32503680000000; // 3000-01-01

        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        const currentTime= currentDate.getTime();

        // Populate days matrix.
        const matrixHTML = [];
        for(let i = 0; i < daysInMonth + startDay; ++i) {
            // Add a row every 7 days.
            if(i % 7 === 0) {
                matrixHTML.push(`${i !== 0 ? '</tr>' : ''}<tr>`);
            }

            // Add new column.
            // If no days from this month in this column, it will be empty.
            if(i + 1 <= startDay) {
                matrixHTML.push('<td></td>');
                continue;
            }

            // Populate day number.
            const dayNum = i + 1 - startDay;
            const classList = ['esm-polyfill-day'];
            if (isSelectedYrMth && selDate && selDate.getDate() === dayNum){
                classList.push('esm-polyfill-day-selected');
            }
            const thisTime = startDate.setDate(dayNum);
            if (thisTime < minTime || thisTime > maxTime) {
                classList.push('esm-polyfill-invalid-day');
            }
            if (thisTime === currentTime) {
                classList.push('esm-polyfill-current-day');
            }

            matrixHTML.push(
                `<td class="${classList.join(' ')}">${dayNum}</td>`
            );
        }

        this.days.innerHTML = matrixHTML.join('');
    }

    pingInput() {
        if (!this.input) {
            throw new Error('You must attach the polyfilled input with attachTo before calling pingInput');
        }
        // Dispatch DOM events to the input.
        let inputEvent;
        let changeEvent;

        // Modern event creation.
        try {
            inputEvent = new Event('input');
            changeEvent = new Event('change');
        }
        // Old-fashioned way.
        catch(e) {
            inputEvent = document.createEvent('KeyboardEvent');
            inputEvent.initEvent('input', true, false);
            changeEvent = document.createEvent('KeyboardEvent');
            changeEvent.initEvent('change', true, false);
        }

        this.input.element.dispatchEvent(inputEvent);
        this.input.element.dispatchEvent(changeEvent);
    }

    public static createInstance({yrsBack = 80, yrsFwd = 20} = {yrsBack: 80, yrsFwd: 20}) {
        Picker._instance = new Picker({ yrsBack, yrsFwd });
    }

    public static getInstance(): Picker {
        return Picker._instance;
    }

    static createRangeSelect(theSelect: HTMLSelectElement, min: number, max: number, namesArray?: string[], selectedValue?: number) {
        theSelect.innerHTML = '';

        for(let i = min; i <= max; ++i) {
            const aOption = document.createElement('option');
            theSelect.appendChild(aOption);
            const stringI = String(i);
            const theText = namesArray ? namesArray[i - min] : stringI;

            aOption.text = theText;
            aOption.value = stringI;

            if(i === selectedValue) {
                aOption.selected = true;
            }
        }

        return theSelect;
    }

    static utcDateToLocal(dt?: Date | number | string) {
        if (!dt || isNaN(dt as any)) {
            return null;
        }
        const returnVar = new Date(dt);
        returnVar.setTime(returnVar.getTime() + returnVar.getTimezoneOffset()*60000);
        return returnVar;
    }
}
