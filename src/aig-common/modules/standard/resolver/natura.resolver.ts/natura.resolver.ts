import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, NaturaDTO, NaturaResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService } from 'aig-standard';

@Injectable()
export class NaturaResolver implements Resolve<Observable<NaturaDTO>> {
    constructor(
        private naturaResourceService: NaturaResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.naturaResourceService.getNaturaUsingGET(id);
    }
}