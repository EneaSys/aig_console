import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, NaturaDTO, NaturaResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';

@Injectable()
export class TipoScontoMaggioranzaResolver implements Resolve<Observable<TipoScontoMaggiorazioneDTO>> {
    constructor(
        private tipoScontoMaggioranzaResourceService: TipoScontoMaggiorazioneResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoScontoMaggioranzaResourceService.getTipoScontoMaggiorazioneUsingGET(id);
    }
}