import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nameFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    // Regex to match "FirstName LastName" with each part starting with a capital letter
    const validFormat = /^[A-Z][a-z]* [A-Z][a-z]*$/.test(value);
    return !validFormat ? { nameFormat: true } : null;
  };
}
