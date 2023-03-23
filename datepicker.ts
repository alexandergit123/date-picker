class Calendar {
    currentMonth: number;
    currentYear: number;
  
    constructor(month: number, year: number) {
      this.currentMonth = month;
      this.currentYear = year;
    }
  
    daysInMonth(): number {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    }
  
    firstDayOfMonth(): number {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    }
  
    previousMonth(): void {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
    }
  
    nextMonth(): void {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
    }
  }
  
  class Datepicker {
    input: HTMLInputElement;
    button: HTMLButtonElement;
    popup: HTMLElement;
    calendar: Calendar;
    blackoutDates: Set<string>;
  
    constructor(inputSelector: string, buttonSelector: string, popupSelector: string) {
      this.input = document.querySelector(inputSelector) as HTMLInputElement;
      this.button = document.querySelector(buttonSelector) as HTMLButtonElement;
      this.popup = document.querySelector(popupSelector) as HTMLElement;
  
      const today = new Date();
      this.calendar = new Calendar(today.getMonth(), today.getFullYear());
      this.blackoutDates = new Set();
  
      this.init();
    }
  
    init(): void {
      // Initialize event listeners and render the calendar
      this.button.addEventListener('click', () => this.togglePopup());
      document.addEventListener('click', (event) => this.handleOutsideClick(event));
      this.popup.querySelector('.datepicker-prev').addEventListener('click', () => this.handleNavigation('previous'));
      this.popup.querySelector('.datepicker-next').addEventListener('click', () => this.handleNavigation('next'));

      this.render();
    }
  
    render(): void {
      // Render the calendar based on the current month and year
      const { currentMonth, currentYear } = this.calendar;
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth));
      const header = this.popup.querySelector('.datepicker-month-year');
      header.textContent = `${monthName} ${currentYear}`;

      const daysInMonth = this.calendar.daysInMonth();
      const firstDay = this.calendar.firstDayOfMonth();
      const calendarBody = this.popup.querySelector('.datepicker-calendar tbody');
      calendarBody.innerHTML = '';

      let date = 1;
      for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement('td');

          if ((i === 0 && j < firstDay) || date > daysInMonth) {
            cell.textContent = '';
          } else {
            const dateStr = `${currentMonth + 1}/${date}/${currentYear}`;
            cell.textContent = date.toString();

            if (this.blackoutDates.has(dateStr)) {
              cell.classList.add('blackout');
            } else {
              cell.addEventListener('click', () => this.handleDateSelection(dateStr));
            }

            date++;
          }

          row.appendChild(cell);
        }
        calendarBody.appendChild(row);
      }
    }
  
    togglePopup(): void {
      // Show or hide the calendar popup
      this.popup.hidden = !this.popup.hidden;
    }

    handleOutsideClick(event: MouseEvent): void {
      if (!this.popup.hidden && !this.popup.contains(event.target as Node) && !this.button.contains(event.target as Node)) {
        this.popup.hidden = true;
      }
    }
  
    handleNavigation(direction: 'previous' | 'next'): void {
      if (direction === 'previous') {
        this.calendar.previousMonth();
      } else {
        this.calendar.nextMonth();
      }
      this.render();
    }
  
    handleDateSelection(dateStr: string): void {
      this.input.value = dateStr;
      this.popup.hidden = true;
    }
  
    setBlackoutDates(dates: string[]): void {
      dates.forEach((date) => this.blackoutDates.add(date));
      this.render();
    }
  
    getBlackoutDates(): string[] {
      return Array.from(this.blackoutDates);
    }
}
