import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService, ModalitaPagamentoDTO, ModalitaPagamentoResourceService, NaturaDTO, NaturaResourceService, RegimeFiscaleDTO, RegimeFiscaleResourceService } from 'aig-standard';

@Injectable()
export class ModalitaPagamentoResolver implements Resolve<Observable<ModalitaPagamentoDTO>> {
    constructor(
        private modalitaPagamentoResourceService: ModalitaPagamentoResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.modalitaPagamentoResourceService.getModalitaPagamentoUsingGET(id);
    }
}