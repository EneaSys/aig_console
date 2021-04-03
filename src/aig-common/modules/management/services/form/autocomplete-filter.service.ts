import { Injectable } from '@angular/core';
import { ApplicationModuleResourceService, PermissionResourceService, RoleResourceService, TenantContextResourceService } from 'aig-management';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
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
                if (value.length > 1) {
                    let filter = {
                        nameContains: value
                    };
                    return this.roleResourceService.getAllRolesUsingGET(filter);
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
                if (value.length > 1) {
                    let filter = {
                        nameContains: value
                    };
                    return this.permissionResourceService.getAllPermissionsUsingGET(filter);
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
                if (value.length > 1) {
                    let filter = {
                        nameContains: value
                    };
                    return this.applicationModuleResourceService.getAllApplicationModulesUsingGET(filter);
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
                if (value.length > 1) {
                    let filter = {
                        nameContains: value
                    };
                    return this.tenantContextResourceService.getAllTenantContextsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

}
