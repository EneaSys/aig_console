import { FormControl } from "@angular/forms";

export class AigValidator {

    static haveId(c: FormControl) {
        if(!(c.value && c.value.id)) {
            return {
                validatorHaveId: {
                    valid: false
                }
            };
        } 
        return null; // funziona
    }        
}