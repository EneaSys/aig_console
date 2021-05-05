import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlFeRegimeFiscaleDTO, IlFeRegimeFiscaleResourceService } from 'aig-standard';

@Injectable()
export class RegimeFiscaleResolver implements Resolve<Observable<IlFeRegimeFiscaleDTO>> {
    constructor(
        private regimeFiscaleResourceService: IlFeRegimeFiscaleResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.regimeFiscaleResourceService.getIlFeRegimeFiscaleUsingGET(id);
    }
}