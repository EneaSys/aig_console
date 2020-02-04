import { Injectable } from '@angular/core';
import { CityDTO } from 'aig-standard';

@Injectable()
export class AigStandardAutocompleteFunctionService {
    cityDisplayFn(city?: CityDTO): string | undefined {
        return city ? city.name : undefined;
    }
}