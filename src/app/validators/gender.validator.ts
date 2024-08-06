import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function genderRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const { genderMale, genderFemale, genderOther } = control.value;
    if (genderMale || genderFemale || genderOther) {
      return null; // Valid
    }
    return { requiredGender: true }; // Invalid
  };
}
