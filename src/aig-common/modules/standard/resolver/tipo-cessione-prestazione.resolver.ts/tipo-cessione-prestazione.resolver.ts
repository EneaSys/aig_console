import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, NaturaDTO, NaturaResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService, TipoCessionePrestazioneDTO, TipoCessionePrestazioneResourceService } from 'aig-standard';

@Injectable()
export class TipoCessionePestazioneResolver implements Resolve<Observable<TipoCessionePrestazioneDTO>> {
    constructor(
        private tipoCessionePestazioneResourceService: TipoCessionePrestazioneResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoCessionePestazioneResourceService.getTipoCessionePrestazioneUsingGET(id);
    }
}