import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { nameFormatValidator } from '../validators/custom.validator';
import { matchPasswordValidator } from '../validators/matchpassword.validator';
import { AuthService } from '../auth.service';
import { User2 } from '../profile.service';
import { Router } from '@angular/router';
import { dateValidator } from '../validators/datevalidator.validator';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
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
  registerUserSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loaderService: LoaderService
  ) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(8), nameFormatValidator()],
        ],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
        country: ['EG', Validators.required], // Default country code as 'EG'
        dateOfBirth: this.fb.group(
          {
            day: [
              '',
              [
                Validators.required,
                Validators.min(1),
                Validators.max(31),
                Validators.pattern(/^\d+$/),
              ],
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
          },
          { validators: dateValidator() }
        ),
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: matchPasswordValidator }
    );

    this.registrationForm.markAllAsTouched();
  }

  ngOnDestroy() {
    if (this.registerUserSubscription) {
      this.registerUserSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const gender = this.registrationForm.get('gender')?.value.toUpperCase(); // Convert gender to uppercase
    if (!['MALE', 'FEMALE', 'OTHER'].includes(gender)) {
      console.error('Invalid gender selected');
      return;
    }

    const dob = {
      year: this.registrationForm.get('dateOfBirth.year')?.value ?? '',
      month: this.registrationForm.get('dateOfBirth.month')?.value ?? '',
      day: this.registrationForm.get('dateOfBirth.day')?.value ?? '',
    };
    const birthDate = `${dob.year}-${monthToNumber(
      dob.month
    )}-${dob.day.padStart(2, '0')}`;

    const requestBody: User2 = {
      email: this.registrationForm.get('email')?.value ?? '',
      phoneNumber: this.registrationForm.get('phoneNumber')?.value ?? '',
      username: this.registrationForm.get('username')?.value ?? '',
      password: this.registrationForm.get('password')?.value ?? '',
      confirmPassword:
        this.registrationForm.get('confirmPassword')?.value ?? '',
      gender,

      country: 'EGYPT', // Set country to "EGYPT"
      dateOfBirth: birthDate,
    };

    this.authService.register(requestBody).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}

function monthToNumber(month: string): string {
  const months: Record<string, string> = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };
  return months[month] ?? '01'; // Default to '01' if month is not found
}
