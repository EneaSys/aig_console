import { Injectable } from '@angular/core';
import { CityDTO, ItalianPublicProcurementModalityDTO } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteDisplayService {
    cityDisplayFn(city?: CityDTO): string | undefined {
        return city ? city.name : undefined;
    }

    italianPublicProcurementModalityDisplayFn (italianPublicProcurementModality?: ItalianPublicProcurementModalityDTO): string | undefined {
        return italianPublicProcurementModality ? italianPublicProcurementModality.name : undefined;
    }


}