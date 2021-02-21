import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { RoleDTO, RoleResourceService } from "api-gest";
import { Observable } from "rxjs";

@Injectable()
export class AigRoleResolver implements Resolve<Observable<RoleDTO>> {

    constructor(private roleResourceService: RoleResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idRole: number = +route.paramMap.get('id');
        return this.roleResourceService.getRoleUsingGET(idRole);
    }
}