import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function defaultSelectOptionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (
      value === '--Select Option--' ||
      value === '' ||
      value === null ||
      value === undefined
    ) {
      return { defaultSelectOptionValidator: true };
    }
    return null;
  };
}
