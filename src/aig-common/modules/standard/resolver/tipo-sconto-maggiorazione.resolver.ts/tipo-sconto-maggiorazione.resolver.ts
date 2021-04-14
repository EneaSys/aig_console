import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, NaturaDTO, NaturaResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';

@Injectable()
export class TipoScontoMaggiorazioneResolver implements Resolve<Observable<TipoScontoMaggiorazioneDTO>> {
    constructor(
        private tipoScontoMaggiorazioneResourceService: TipoScontoMaggiorazioneResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoScontoMaggiorazioneResourceService.getTipoScontoMaggiorazioneUsingGET(id);
    }
}