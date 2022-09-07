import { AbstractControl, ValidatorFn, ValidationErrors, FormControl, DefaultValueAccessor } from '@angular/forms';
export const passConfValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  
  const pass = control.get('password');
  const confPass = control.get('confirmPass');
  
  

  return pass && confPass && pass.value !== confPass.value
    ? { matchError: true }
    : null;
};
