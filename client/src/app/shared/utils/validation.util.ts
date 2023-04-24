import { FormControl, FormGroup } from "@angular/forms";

export const validateFormFields = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        }
    });
};