import { FormControl } from "@angular/forms";

export class AigValidator {

    static haveId(c: FormControl) {
		if(c.value == null || c.value == "") {
			return null;
		}
        if(!(c.value && c.value.id)) {
            return {
                validatorHaveId: {
                    valid: false
                }
            };
        } 
        return null; // funziona
    }

	static haveCode(c: FormControl) {
        if(!(c.value && c.value.code)) {
            return {
                validatorHaveCode: {
                    valid: false
                }
            };
        } 
        return null; // funziona
    }
}