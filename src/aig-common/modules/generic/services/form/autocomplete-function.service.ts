import { Injectable } from '@angular/core';
import { AddressDTO, EopooDTO, EopooTypeDTO, FormTypeDTO, ReferentDTO } from 'aig-generic';
import { EopooNamePipe } from '../../pipe/eopoo-name.pipe';

@Injectable()
export class AigGenericAutocompleteDisplayService {
    eopooDisplayFn(eopoo?: EopooDTO): string | undefined {
        return eopoo ? new EopooNamePipe().transform(eopoo) : undefined;
    }

	eopooTypeDisplayFn(eopooType?: EopooTypeDTO): string | undefined {
		return eopooType ? eopooType.name : undefined;
	}

    addressDisplayFn(address?: AddressDTO): any | undefined {
        return address ? address.name : undefined;
    }

    referentDisplayFn(referent?: ReferentDTO): any | undefined {
        return referent ? referent.firstname + " " + referent.lastname : undefined;
    }

	formTypeDisplayFn(formType?: FormTypeDTO): any | undefined {
        return formType ? formType.name : undefined;
    }
}