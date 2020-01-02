import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomRolePermissionResourceService, CustomRolePermissionDTO } from 'api-gest';

@Injectable()
export class PermissionsRoleCustomResolver implements Resolve<Observable<CustomRolePermissionDTO[]>> {
    constructor(private customRolePermissionResourceService: CustomRolePermissionResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idRoleCustom: number = +route.paramMap.get('id');
        return this.customRolePermissionResourceService.getAllCustomRolePermissionsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, idRoleCustom, null, null, null, null, null, null, null, null, null);
    }
}