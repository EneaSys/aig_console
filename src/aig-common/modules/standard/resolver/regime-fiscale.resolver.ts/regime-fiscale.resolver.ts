import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService } from 'aig-standard';

@Injectable()
export class RegimeFiscaleResolver implements Resolve<Observable<RegimeFiscaleDTO>> {
    constructor(
        private regimeFiscaleResourceService: RegimeFiscaleResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.regimeFiscaleResourceService.getRegimeFiscaleUsingGET(id);
    }
}