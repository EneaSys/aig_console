import { Injectable } from '@angular/core';
import { ProcurementDTO } from 'aig-italianlegislation';


@Injectable({
	providedIn: 'root'
})
export class AigAutocompleteDisplayService {
	procurementDisplayFn(procurement?: ProcurementDTO): number | undefined {
        return procurement ? procurement.id : undefined;
    }
}