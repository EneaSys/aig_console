import { Injectable } from '@angular/core';
import { CityDTO, ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotTypeDTO, ItalianPublicProcurementModalityDTO, ItalianPublicProcurementProcedureDTO, ItalianPublicProcurementSectorDTO } from 'aig-standard';

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

    ippModalityDisplayFn (italianPublicProcurementModality?: ItalianPublicProcurementModalityDTO): string | undefined {
        return italianPublicProcurementModality ? italianPublicProcurementModality.name : undefined;
    }

    ippLotTypeDisplayFn (italianPublicProcurementLotType?: ItalianPublicProcurementLotTypeDTO): string | undefined {
        return italianPublicProcurementLotType ? italianPublicProcurementLotType.name : undefined;
    }

    ippLotCategoryDisplayFn (italianPublicProcurementLotCategory?: ItalianPublicProcurementLotCategoryDTO): string | undefined {
        return italianPublicProcurementLotCategory ? italianPublicProcurementLotCategory.name : undefined;
    }





}