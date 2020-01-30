import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementProcedureDTO } from 'aig-standard';

@Injectable()
export class IppProcedureResolver implements Resolve<Observable<ItalianPublicProcurementProcedureDTO>> {
    constructor(private roleResourceService: ItalianPublicProcurementProcedureResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('fdsafdsa');
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getItalianPublicProcurementProcedureUsingGET(id);
    }
}