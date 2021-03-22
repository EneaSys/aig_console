import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ContextUserDTO, ContextUserResourceService } from "aig-management";
import { Observable } from "rxjs";

@Injectable()
export class AigContextUserResolver implements Resolve<Observable<ContextUserDTO>> {

    constructor(private contextUserResourceService: ContextUserResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idContextUser: number = +route.paramMap.get('id');
        return this.contextUserResourceService.getContextUserUsingGET(idContextUser);
    }
}