import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, EsigibilitaIvaDTO, EsigibilitaIvaResourceService, NaturaDTO, NaturaResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService } from 'aig-standard';

@Injectable()
export class EsigibilitaIvaResolver implements Resolve<Observable<EsigibilitaIvaDTO>> {
    constructor(
        private esigibilitaIvaResourceService: EsigibilitaIvaResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.esigibilitaIvaResourceService.getEsigibilitaIvaUsingGET(id);
    }
}