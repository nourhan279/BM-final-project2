import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { nameFormatValidator } from '../validators/custom.validator';
import { matchPasswordValidator } from '../validators/matchpassword.validator';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  registrationForm: FormGroup;
  months: string[] = [
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
    'December',
  ];
  years: number[] = [];
  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }

    this.registrationForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(8), nameFormatValidator()],
        ],
        email: ['', [Validators.required, Validators.email]],
        country: ['UK', Validators.required],
        dob: this.fb.group({
          day: [
            '',
            [Validators.required, Validators.min(1), Validators.max(31)],
          ],
          month: [
            '',
            [Validators.required, Validators.min(1), Validators.max(12)],
          ],
          year: [
            '',
            [
              Validators.required,
              Validators.min(1900),
              Validators.max(new Date().getFullYear()),
            ],
          ],
        }),
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: matchPasswordValidator }
    );
    this.registrationForm.markAllAsTouched();
    // Log form validity and errors after initialization
    console.log('Form Initialized');
    console.log('Form Valid:', this.registrationForm.valid);
    console.log('Form Errors:', this.registrationForm.errors);
    console.log(
      'Password Control Errors:',
      this.registrationForm.get('password')?.errors
    );
    console.log(
      'Confirm Password Control Errors:',
      this.registrationForm.get('confirmPassword')?.errors
    );
    console.log(
      'Password Control Touched:',
      this.registrationForm.get('password')?.touched
    );
    console.log(
      'Confirm Password Control Touched:',
      this.registrationForm.get('confirmPassword')?.touched
    );
    console.log('Form Controls:', this.registrationForm.controls);
    console.log(
      'Password Control Errors:',
      this.registrationForm.get('password')?.errors
    );
    console.log(
      'Confirm Password Control Errors:',
      this.registrationForm.get('confirmPassword')?.errors
    );
    console.log(
      'Email Control Errors:',
      this.registrationForm.get('email')?.errors
    );
    console.log(
      'Username Control Errors:',
      this.registrationForm.get('username')?.errors
    );
    console.log(
      'Country Control Errors:',
      this.registrationForm.get('country')?.errors
    );
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
    }
  }
}
