import { Injectable } from '@angular/core';
import { CityDTO, CpvDTO, IlPpPartecipationTypeDTO, IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotCategoryDTO, IlPpProcurementLotTypeDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO, IlPpProcurementStatusDTO } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteDisplayService {
    cityDisplayFn(city?: CityDTO): string | undefined {
        return city ? city.name : undefined;
    }


    ilPpProcurementStatusDisplayFn(procurementStatus?: IlPpProcurementStatusDTO): string | undefined {
        return procurementStatus ? procurementStatus.name : undefined;
    }
    ilPpPartecipationTypeDisplayFn(partecipationType?: IlPpPartecipationTypeDTO): string | undefined {
        return partecipationType ? partecipationType.name : undefined;
    }

    ippProcedureDisplayFn(ippProcedure?: IlPpProcurementProcedureDTO): string | undefined {
        return ippProcedure ? ippProcedure.name : undefined;
    }

    ippSectorDisplayFn(ippSector?: IlPpProcurementSectorDTO): string | undefined {
        return ippSector ? ippSector.name : undefined;
    }

    ippModalityDisplayFn (ippModality?: IlPpProcurementModalityDTO): string | undefined {
        return ippModality ? ippModality.name : undefined;
    }

    ippLotTypeDisplayFn (ippLotType?: IlPpProcurementLotTypeDTO): string | undefined {
        return ippLotType ? ippLotType.name : undefined;
    }

    ippLotCategoryDisplayFn (ippLotCategory?: IlPpProcurementLotCategoryDTO): string | undefined {
        return ippLotCategory ? ippLotCategory.name : undefined;
    }
    cpvDisplayFn (cpv?: CpvDTO): string | undefined {
        return cpv ? cpv.name : undefined;
    }
    ippLotAwardCriterionDisplayFn (awardCriterion?: IlPpProcurementLotAwardCriterionDTO): string | undefined {
        return awardCriterion ? awardCriterion.name : undefined;
    }
    
    





}