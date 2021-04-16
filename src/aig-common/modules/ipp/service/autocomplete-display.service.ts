import { Injectable } from '@angular/core';
import { ProcurementDTO, ProcurementLotDTO } from 'aig-italianlegislation';


@Injectable({
	providedIn: 'root'
})
export class AigIppAutocompleteDisplayService {
	procurementDisplayFn(procurement?: ProcurementDTO): number | undefined {
        return procurement ? procurement.id : undefined;
    }

    procurementLotDisplayFn(procurementLot?: ProcurementLotDTO): number | undefined {
        return procurementLot ? procurementLot.id : undefined;
    }
}