import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ContextGroupResourceService, UserResourceService, RoleResourceService, CustomRoleResourceService, PermissionResourceService, ApplicationModuleResourceService, TenantContextResourceService } from 'api-gest';

@Injectable()
export class AigManagementAutocompleteFilterService {
    constructor(
        private roleResourceService: RoleResourceService,
        private permissionResourceService: PermissionResourceService,
        private applicationModuleResourceService: ApplicationModuleResourceService,
        private tenantContextResourceService: TenantContextResourceService,
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

    applicationModuleFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.applicationModuleResourceService.getAllApplicationModulesUsingGET(null,null,null,null,null,null,null,null,value);
                } else {
                    return of([]);
                }
            })
        );
    }

    tenantContextFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.tenantContextResourceService.getAllTenantContextsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,value);
                } else {
                    return of([]);
                }
            })
        );
    }

}