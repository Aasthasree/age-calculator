//Angular Imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {
  ageForm: FormGroup;
  ageYears: number;
  ageMonths: number;
  ageDays: number;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.ageForm = this.formBuilder.group({
      day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      year: ['', [Validators.required, Validators.max(2024)]],
    });
  }

  calculateAge(): void {
    if (this.ageForm.valid) {
      const day = this.ageForm.get('day').value;
      const month = this.ageForm.get('month').value;
      const year = this.ageForm.get('year').value;

      if (!this.isValidDay(day, month, year)) {
        this.errorMessage = 'Invalid day for the selected month.';
        return;
      }
      this.errorMessage = '';


      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      let newYear = Math.abs(currentYear - year);
      let newMonth = 0;
      let newDay = 0;

      if (currentMonth >= month) {
        newMonth = currentMonth - month;
      } else {
        newYear--;
        newMonth = 12 + currentMonth - month;
      }

      if (currentDay >= day) {
        newDay = currentDay - day;
      } else {
        newMonth--;
        if (this.isLeapYear(day, month, year)) {
          newDay = 30 + currentDay - day;
        } else {
          newDay = currentDay - day;
        }

        if (newMonth < 0) {
          newMonth = 11;
          newYear--;
        }
        if (newMonth < currentMonth) {
          newDay++;
        }
      }


      this.ageYears = newYear;
      this.ageMonths = newMonth;
      this.ageDays = newDay;
    }
  }

  isLeapYear(day: number, month: number, year: number): boolean {
    month = month - 1;
    const fullDate = new Date(year, month, day);
    return day === fullDate.getDate() && month === fullDate.getMonth() && year === fullDate.getFullYear();
  }

  isValidDay(day: number, month: number, year: number): boolean {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return day <= lastDayOfMonth;
  }

}