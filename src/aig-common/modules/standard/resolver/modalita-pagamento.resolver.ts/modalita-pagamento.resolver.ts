import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlFePagamentoModalitaDTO, IlFePagamentoModalitaResourceService} from 'aig-standard';

@Injectable()
export class ModalitaPagamentoResolver implements Resolve<Observable<IlFePagamentoModalitaDTO>> {
    constructor(
        private modalitaPagamentoResourceService: IlFePagamentoModalitaResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.modalitaPagamentoResourceService.getIlFePagamentoModalitaUsingGET(id);
    }
}