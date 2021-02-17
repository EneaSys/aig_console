import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ContextModuleResourceService } from 'api-gest';

import { ContextModuleDTO } from 'api-gest/model/contextModuleDTO';
import { Observable } from 'rxjs';


@Injectable()
export class ContextModuleResolver implements Resolve<Observable<ContextModuleDTO>> {
    constructor(private contextModuleResourceService: ContextModuleResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.contextModuleResourceService.getContextModuleUsingGET(id);
    }
}