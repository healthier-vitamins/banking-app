import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyNumAndDotValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const hasUpper = /[A-Z]+/.test(value);
    const hasLower = /[a-z]+/.test(value);
    const hasSpecial = /[ !"#$%&'()*+,--/:;<=>?@[\\\]^_`{|}~]/.test(value);

    const invalid = hasUpper || hasLower || hasSpecial;

    return invalid ? { onlyNumAndDotValidator: true } : null;
  };
}
