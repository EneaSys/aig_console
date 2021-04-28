import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DatiVeicoliDTO, DatiVeicoliResourceService } from 'aig-italianlegislation';

@Injectable()
export class DatiVeicoliResolver implements Resolve<Observable<DatiVeicoliDTO>> {
    constructor(private datiVeicoliResourceService: DatiVeicoliResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.datiVeicoliResourceService.getDatiVeicoliUsingGET(id);
    }
}