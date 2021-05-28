import { Injectable } from '@angular/core';
import { AddressDTO, EopooDTO, ReferentDTO } from 'aig-generic';
import { Observable } from 'rxjs';
import { EopooNamePipe } from '../../pipe/eopoo-name.pipe';

@Injectable()
export class AigGenericAutocompleteDisplayService {
    eopooDisplayFn(eopoo?: EopooDTO): string | undefined {
        return eopoo ? new EopooNamePipe().transform(eopoo) : undefined;
    }

    addressDisplayFn(address?: AddressDTO): any | undefined {
        return address ? address.name : undefined;
    }

    referentDisplayFn(referent?: ReferentDTO): any | undefined {
        return referent ? referent.firstname + " " + referent.lastname : undefined;
    }
}