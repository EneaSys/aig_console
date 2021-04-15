import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService, TipoCassaDTO, TipoCassaResourceService, TipoRitenutaDTO, TipoRitenutaResourceService } from 'aig-standard';

@Injectable()
export class TipoRitenutaResolver implements Resolve<Observable<TipoRitenutaDTO>> {
    constructor(
        private tipoRitenutaResourceService: TipoRitenutaResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoRitenutaResourceService.getTipoRitenutaUsingGET(id);
    }
}