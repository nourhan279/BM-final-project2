import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const year = control.get('year')?.value;

    if (!year) return null;

    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    return age < 18 ? { underage: true } : null;
  };
}
