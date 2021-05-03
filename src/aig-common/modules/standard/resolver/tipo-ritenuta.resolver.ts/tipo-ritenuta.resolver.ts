import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlFeRitenutaTipoDTO, IlFeRitenutaTipoResourceService } from 'aig-standard';

@Injectable()
export class TipoRitenutaResolver implements Resolve<Observable<IlFeRitenutaTipoDTO>> {
    constructor(
        private tipoRitenutaResourceService: IlFeRitenutaTipoResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.tipoRitenutaResourceService.getIlFeRitenutaTipoUsingGET(id);
    }
}