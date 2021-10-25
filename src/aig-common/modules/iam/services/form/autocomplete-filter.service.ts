import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ContextGroupResourceService, UserResourceService, CustomRoleResourceService } from 'api-gest';
import { RoleResourceService } from 'aig-management';

@Injectable()
export class AigAutocompleteFilterService {
    constructor(
        private contextGroupResourceService: ContextGroupResourceService,
        private userResourceService: UserResourceService,
        private roleResourceService: RoleResourceService,
        private customRoleResourceService: CustomRoleResourceService,
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
                if (value.length > 1) {
					let filters = {
						roleNameContains: value
					};
                    return this.roleResourceService.getAllRolesUsingGET(filters);
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
}