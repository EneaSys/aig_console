import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomRoleDTO, CustomRoleResourceService } from 'api-gest';

@Injectable()
export class RoleCustomResolver implements Resolve<Observable<CustomRoleDTO>> {
    constructor(private customRoleResourceService: CustomRoleResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idRoleCustom: number = +route.paramMap.get('id');
        return this.customRoleResourceService.getCustomRoleUsingGET(idRoleCustom);
    }
}