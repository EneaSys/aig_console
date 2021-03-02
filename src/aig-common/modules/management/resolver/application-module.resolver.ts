import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApplicationModuleDTO, ApplicationModuleResourceService } from 'aig-management';
import { Observable } from 'rxjs';

@Injectable()
export class AigApplicationModuleResolver implements Resolve<Observable<ApplicationModuleDTO>> {

    constructor(private applicationModuleResourceService: ApplicationModuleResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idApplicationModule: number = +route.paramMap.get('id');
        return this.applicationModuleResourceService.getApplicationModuleUsingGET(idApplicationModule);
    }
}