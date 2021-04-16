import { Injectable } from '@angular/core';
import { EopooDTO } from 'aig-generic';
import { PartecipationDTO, ProcurementDTO } from 'aig-italianlegislation';


@Injectable({
	providedIn: 'root'
})
export class AigAutocompleteDisplayService {
	procurementDisplayFn(procurement?: ProcurementDTO): number | undefined {
        return procurement ? procurement.id : undefined;
    }
    eopooDisplayFn(eopoo?: EopooDTO): any | undefined {
        return eopoo ? eopoo.person : undefined;
    }
    partecipationDisplayFn(partecipation?: PartecipationDTO): any | undefined {
        return partecipation ? partecipation.id : undefined;
    }
}