import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { PermissionDTO, PermissionResourceService } from "aig-management";
import { Observable } from "rxjs";

@Injectable()
export class AigPermissionResolver implements Resolve<Observable<PermissionDTO>> {

    constructor(private permissionResourceService: PermissionResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idPermission: number = +route.paramMap.get('id');
        return this.permissionResourceService.getPermissionUsingGET(idPermission);
    }
}