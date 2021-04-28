import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DatiPagamentoDTO, DatiPagamentoResourceService } from 'aig-italianlegislation';

@Injectable()
export class DatiPagamentoResolver implements Resolve<Observable<DatiPagamentoDTO>> {
    constructor(private datiPagamentoResourceService: DatiPagamentoResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.datiPagamentoResourceService.getDatiPagamentoUsingGET(id);
    }
}