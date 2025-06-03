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
    const day = this.ageForm.get('day')?.value;
    const month = this.ageForm.get('month')?.value - 1; // JS months are 0-based
    const year = this.ageForm.get('year')?.value;

    if (!this.isValidDay(day, month + 1, year)) {
      this.errorMessage = 'Invalid day for the selected month.';
      return;
    }
    this.errorMessage = '';

    const birthDate = new Date(year, month, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    this.ageYears = years;
    this.ageMonths = months;
    this.ageDays = days;
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
