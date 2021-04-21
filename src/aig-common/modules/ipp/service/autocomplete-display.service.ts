import { Injectable } from '@angular/core';
import { ProcurementDTO, ProcurementLotDTO } from 'aig-italianlegislation';
import { EopooDTO } from 'aig-generic';
import { PartecipationDTO } from 'aig-italianlegislation';


@Injectable({
	providedIn: 'root'
})
export class AigIppAutocompleteDisplayService {
	procurementDisplayFn(procurement?: ProcurementDTO): string | undefined {
        return procurement ? procurement.description : undefined;
    }

    procurementLotDisplayFn(procurementLot?: ProcurementLotDTO): string | undefined {
        return procurementLot ? procurementLot.description : undefined;
    }

    partecipationDisplayFn(partecipation?: PartecipationDTO): any | undefined {
        return partecipation ? partecipation.procurementLotCig + " > " + partecipation.proposerEopooCode : undefined;
    }
}