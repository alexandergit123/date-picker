class Datepicker {
    private input: HTMLInputElement;
    private button: HTMLElement;
    private popup: HTMLElement;
    private blackoutDates: Set<string>;

    constructor(inputId: string, buttonId: string, popupId: string) {
        this.input = document.getElementById(inputId) as HTMLInputElement;
        this.button = document.getElementById(buttonId)!;
        this.popup = document.getElementById(popupId)!;
        this.blackoutDates = new Set<string>();

        this.addListeners();
    }

    private addListeners(): void {
        this.button.addEventListener("click", () => {
            if (this.popup.classList.contains("hidden")) {
                this.render();
                this.popup.classList.remove("hidden");
            } else {
                this.popup.classList.add("hidden");
            }
        });

        this.input.addEventListener("input", (event) => {
            // Add validation logic for the input date
        });
    }

    private render(month?: number, year?: number): void {
        // Render the calendar in the popup
    }

    public setBlackoutDates(dates: string[]): void {
        this.blackoutDates.clear();
        dates.forEach((date) => this.blackoutDates.add(date));
    }
}

const datepicker = new Datepicker("date-input", "toggle-datepicker", "datepicker-popup");
