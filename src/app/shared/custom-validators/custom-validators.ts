import { ValidationErrors, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {

    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from password form control
        const confirmPassword: string = control.get('confirmPassword').value; // get password from confirmPassword form control
        // compare if the passwords match
        if (password !== confirmPassword) {
            // if they don't match, display an error in the confirmPassword form control
            control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
    }

    // Remove white spaces

    static removeSpaces(control: FormControl) {
        if (control && control.value) {
            let removedSpaces = control.value.split(' ').join('');
            control.value !== removedSpaces && control.setValue(removedSpaces);
        }
    }

    static isWhitespace(control: AbstractControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

}