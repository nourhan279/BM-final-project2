import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { nameFormatValidator } from '../validators/custom.validator';
import { matchPasswordValidator } from '../validators/matchpassword.validator';
import { AuthService } from '../auth.service';
import { user, User2 } from '../profile.service';
import { Router } from '@angular/router';
import { dateValidator } from '../validators/datevalidator.validator';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

// Custom validator function to check if at least one checkbox is selected

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
        country: ['UK', Validators.required],
        dob: this.fb.group(
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
        genderMale: [false],
        genderFemale: [false],
        genderOther: [false],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: matchPasswordValidator }
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

  ngOnDestroy() {
    console.log('CreateAccountComponent is being destroyed');
    if (this.registerUserSubscription) {
      this.registerUserSubscription.unsubscribe();
      console.log('Unsubscribed from registerUserSubscription');
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
      const postData = { ...this.registrationForm.value };
      delete postData.confirmPassword;
      this.registerUserSubscription = this.authService
        .registerUser(postData as User2)
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['login']);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
