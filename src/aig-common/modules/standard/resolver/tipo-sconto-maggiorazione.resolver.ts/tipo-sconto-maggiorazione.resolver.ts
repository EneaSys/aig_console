import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlFeScontoMaggiorazioneTipoDTO, IlFeScontoMaggiorazioneTipoResourceService } from 'aig-standard';

@Injectable()
export class TipoScontoMaggiorazioneResolver implements Resolve<Observable<IlFeScontoMaggiorazioneTipoDTO>> {
    constructor(
        private tipoScontoMaggiorazioneResourceService: IlFeScontoMaggiorazioneTipoResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoScontoMaggiorazioneResourceService.getIlFeScontoMaggiorazioneTipoUsingGET(id);
    }
}