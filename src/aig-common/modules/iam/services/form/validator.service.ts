import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable()
export class AigValidatorService {
    public getFirstOrSecondValidator(first: string, second: string) {
        return (formGroup: FormGroup): ValidationErrors | null => {
            const firstControl = formGroup.controls[first];
            const secondControl = formGroup.controls[second];
            if (firstControl.value == "" && secondControl.value == "") {
                firstControl.setErrors({ notEquivalent: true });
                secondControl.setErrors({ notEquivalent: true });
            }
            if (firstControl.value != "" && secondControl.value != "") {
                firstControl.setErrors({ notEquivalent: true });
                secondControl.setErrors({ notEquivalent: true });
            }
            else {
                firstControl.setErrors(null);
                secondControl.setErrors(null);
            }
            return;
        };
    }
}