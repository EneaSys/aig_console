import { Injectable } from '@angular/core';
import { CityDTO, CpvDTO, ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotTypeDTO, ItalianPublicProcurementModalityDTO, ItalianPublicProcurementProcedureDTO, ItalianPublicProcurementSectorDTO } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteDisplayService {
    cityDisplayFn(city?: CityDTO): string | undefined {
        return city ? city.name : undefined;
    }

    ippProcedureDisplayFn(ippProcedure?: ItalianPublicProcurementProcedureDTO): string | undefined {
        return ippProcedure ? ippProcedure.name : undefined;
    }

    ippSectorDisplayFn(ippSector?: ItalianPublicProcurementSectorDTO): string | undefined {
        return ippSector ? ippSector.name : undefined;
    }

    ippModalityDisplayFn (ippModality?: ItalianPublicProcurementModalityDTO): string | undefined {
        return ippModality ? ippModality.name : undefined;
    }

    ippLotTypeDisplayFn (ippLotType?: ItalianPublicProcurementLotTypeDTO): string | undefined {
        return ippLotType ? ippLotType.name : undefined;
    }

    ippLotCategoryDisplayFn (ippLotCategory?: ItalianPublicProcurementLotCategoryDTO): string | undefined {
        return ippLotCategory ? ippLotCategory.name : undefined;
    }
    cpvDisplayFn (cpv?: CpvDTO): string | undefined {
        return cpv ? cpv.name : undefined;
    }





}