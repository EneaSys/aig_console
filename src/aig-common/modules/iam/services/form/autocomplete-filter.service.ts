import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ContextGroupResourceService, UserResourceService, RoleResourceService, CustomRoleResourceService } from 'api-gest';
import { InventoryCategoryResourceService } from 'aig-commerce';

@Injectable()
export class AigAutocompleteFilterService {
    constructor(
        private contextGroupResourceService: ContextGroupResourceService,
        private userResourceService: UserResourceService,
        private roleResourceService: RoleResourceService,
        private customRoleResourceService: CustomRoleResourceService,
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
    ) { }

    filterGroups(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.contextGroupResourceService.getAllContextGroupsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, value, null, null, null, null, null, null, 10, null, null, null, null, null, null, null, null, null);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterUsers(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.userResourceService.getAllUsersUsingGET(null, null, null, null, null, null, null, null, null, 10, null, null, null, null, null, null, null, null, null, value, null, null, null, null, null, null, null, null, null, null, null, null, null);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterSystemRole(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.roleResourceService.getAllRolesUsingGET(null, null, null, null, null, null, null, null, value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 10, null);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterCustomRole(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.customRoleResourceService.getAllCustomRolesUsingGET(null, null, null, null, null, null, null, null, value, null, null, null, null, null, null, 10, null);
                } else {
                    return of([]);
                }
            })
        );
    }

    filterInventoryCategory(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 1) {
                    return this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, value, null, null, null, null, null, null, null, 10, null, null, null);
                } else {
                    return of([]);
                }
            })
        );
    }
}