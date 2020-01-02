import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ContextGroupResourceService, UserResourceService, RoleResourceService, CustomRoleResourceService, PermissionResourceService } from 'api-gest';

@Injectable()
export class AigManagementAutocompleteFilterService {
    constructor(
        private roleResourceService: RoleResourceService,
        private permissionResourceService: PermissionResourceService,
    ) { }

    roleFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.roleResourceService.getAllRolesUsingGET(null, null, null, null, null, null, null, null, value, null,  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 10, null);
                } else {
                    return of([]);
                }
            })
        );
    }

    permissionFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.permissionResourceService.getAllPermissionsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 10, null);
                } else {
                    return of([]);
                }
            })
        );
    }

}