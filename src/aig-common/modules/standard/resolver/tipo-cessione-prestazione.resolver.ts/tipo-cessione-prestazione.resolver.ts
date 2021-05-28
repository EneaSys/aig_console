import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlFeCessionePrestazioneTipoDTO, IlFeCessionePrestazioneTipoResourceService } from 'aig-standard';

@Injectable()
export class TipoCessionePestazioneResolver implements Resolve<Observable<IlFeCessionePrestazioneTipoDTO>> {
    constructor(
        private tipoCessionePestazioneResourceService: IlFeCessionePrestazioneTipoResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoCessionePestazioneResourceService.getIlFeCessionePrestazioneTipoUsingGET(id);
    }
}