import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleResourceService, RoleDTO } from 'api-gest';

@Injectable()
export class RoleSystemResolver implements Resolve<Observable<RoleDTO>> {
    constructor(private roleResourceService: RoleResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idRoleSystem: number = +route.paramMap.get('id');
        return this.roleResourceService.getRoleUsingGET(idRoleSystem);
    }
}