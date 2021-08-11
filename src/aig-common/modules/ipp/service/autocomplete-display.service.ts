import { Injectable } from '@angular/core';
import { IlPpProcurementLotCategoryDTO, InsurancePolicyStatusDTO, PartecipationModalityDTO, PartecipationStatusDTO, PreparationDTO, PreparationStatusDTO, ProcurementDTO, ProcurementLotDTO } from 'aig-italianlegislation';
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
        return partecipation ? partecipation.procurementLot.cig + " > " + partecipation.proposerEopooCode : undefined;
    }

	partecipationModalityDisplayFn(partecipationModality?: PartecipationModalityDTO): any | undefined {
        return partecipationModality ? partecipationModality.description : undefined;
    }

    partecipationStatusDisplayFn(partecipationStatus?: PartecipationStatusDTO): any | undefined {
        return partecipationStatus ? partecipationStatus.description : undefined;
    }

    preparationStatusDisplayFn(preparationStatus?: PreparationStatusDTO): any | undefined {
        return preparationStatus ? preparationStatus.description : undefined;
    }

    preparationDisplayFn(preparation?: PreparationDTO): any | undefined {
        return preparation ? preparation.id : undefined;
    }

    categoryDisplayFn(category?: IlPpProcurementLotCategoryDTO): any | undefined {
        return category ? category.name : undefined;
    }

    insurancePolicyStatusDisplayFn(insurancePolicyStatus?: InsurancePolicyStatusDTO): any | undefined {
        return insurancePolicyStatus ? insurancePolicyStatus.description : undefined;
    }
}