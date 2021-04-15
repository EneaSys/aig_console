import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService, TipoCassaDTO, TipoCassaResourceService } from 'aig-standard';

@Injectable()
export class TipoCassaResolver implements Resolve<Observable<TipoCassaDTO>> {
    constructor(
        private tipoCassaResourceService: TipoCassaResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoCassaResourceService.getTipoCassaUsingGET(id);
    }
}