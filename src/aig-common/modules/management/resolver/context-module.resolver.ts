import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ContextModuleDTO, ContextModuleResourceService } from "api-gest";
import { Observable } from "rxjs";

@Injectable()
export class AigContextModuleResolver implements Resolve<Observable<ContextModuleDTO>> {

    constructor(private contextModuleResourceService: ContextModuleResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idContextModule: number = +route.paramMap.get('id');
        return this.contextModuleResourceService.getContextModuleUsingGET(idContextModule);
    }
}