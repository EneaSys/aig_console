import { Injectable } from '@angular/core';
import { ApplicationModuleResourceService, EntityReferenceResourceService, LicenzeResourceService, ObjectReferenceResourceService, PermissionResourceService, RoleResourceService, TenantContextResourceService } from 'aig-management';
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
        private entityReferenceResourceService: EntityReferenceResourceService,
        private tenantContextResourceService: TenantContextResourceService,
        private licenceResourceService: LicenzeResourceService,
        private objectReferenceResourceService: ObjectReferenceResourceService,
    ) { }

    roleFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {
                        roleNameContains: value
                    };
                    return this.roleResourceService.getAllRolesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    licenceFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {
                        nameContains: value
                    };
                    return this.licenceResourceService.getAllLicenzesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    entityReferenceFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {
                        nameContains: value
                    };
                    return this.entityReferenceResourceService.getAllEntityReferencesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
    }

    objectReferenceFilter(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {
                        nameContains: value
                    };
                    return this.objectReferenceResourceService.getAllObjectReferencesUsingGET(filter);
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
                if (value && value.length > 0) {
                    let filter = {
                        permissionNameContains: value
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
                if (value && value.length > 0) {
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
                if (value && value.length > 0) {
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
