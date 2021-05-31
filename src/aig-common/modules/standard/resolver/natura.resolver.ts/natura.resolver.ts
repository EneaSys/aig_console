import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {IlFeNaturaDTO, IlFeNaturaResourceService} from 'aig-standard';

@Injectable()
export class NaturaResolver implements Resolve<Observable<IlFeNaturaDTO>> {
    constructor(
        private naturaResourceService: IlFeNaturaResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.naturaResourceService.getIlFeNaturaUsingGET(id);
    }
}