import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlFeCassaTipoDTO, IlFeCassaTipoResourceService } from 'aig-standard';

@Injectable()
export class TipoCassaResolver implements Resolve<Observable<IlFeCassaTipoDTO>> {
    constructor(
        private tipoCassaResourceService: IlFeCassaTipoResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoCassaResourceService.getIlFeCassaTipoUsingGET(id);
    }
}