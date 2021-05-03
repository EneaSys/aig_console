import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlFeEsigibilitaIvaDTO, IlFeEsigibilitaIvaResourceService} from 'aig-standard';

@Injectable()
export class EsigibilitaIvaResolver implements Resolve<Observable<IlFeEsigibilitaIvaDTO>> {
    constructor(
        private esigibilitaIvaResourceService: IlFeEsigibilitaIvaResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.esigibilitaIvaResourceService.getIlFeEsigibilitaIvaUsingGET(id);
    }
}