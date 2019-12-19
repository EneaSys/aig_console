import { Injectable } from '@angular/core';
import { FuseNavigation, FuseNavigationItem } from '@fuse/types';
import { UserPermissionMemoryResourceService } from 'api-gest';
import { navigation } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Injectable()
export class AigModuleNavigationService {
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private userPermissionMemoryResourceService: UserPermissionMemoryResourceService,
    ) { }

    private navigation: FuseNavigation[];
    private userPermissions: string[];
    private currentNavigationId: string = 'main';

    loadNavigation() {
        this._loadNavigation(this.currentNavigationId);
    }

    reloadNavigation() {
        var id = Math.random().toString(36).substring(2, 15);
        console.log(id);
        this._loadNavigation(id);
    }

    private async _loadNavigation(navigationId: string) {
        var permissions: string[] = await this.userPermissionMemoryResourceService.getUserPermission().toPromise();
        this.userPermissions = permissions;

        this.navigation = [];
        navigation.forEach((value: FuseNavigation) => {
            this.examineItem(value);
        })

        this._fuseNavigationService.register(navigationId, this.navigation);
        this._fuseNavigationService.setCurrentNavigation(navigationId);
    }

    private examineItem(navigationItem: FuseNavigationItem) {
        var savedChild = 0;
        var childs: FuseNavigationItem[] = [];

        if (navigationItem.children != null) {
            navigationItem.children.forEach((subItem: FuseNavigationItem, key: number, array: FuseNavigationItem[]) => {
                if (this.examineItem(subItem)) {
                    childs.push(subItem);
                    savedChild++
                }
            })
        }

        if (navigationItem.type == 'item' && navigationItem.permission != null) {
            // Chek if if user have permission required for item
            if (!this.containOneOf(this.userPermissions, navigationItem.permission)) {
                return false;
            }
        }

        if (navigationItem.type == 'group' && savedChild > 0) {
            navigationItem.children = childs
            this.navigation.push(navigationItem);
        }

        return true;
    }

    private containOneOf(userPermissions: string[], menuRequiredPermissions: string[]): boolean {
        var result: boolean = false;
        menuRequiredPermissions.forEach((menuRequiredPermission: string) => {
            if (userPermissions.indexOf(menuRequiredPermission) > -1) {
                result = true;
            }
        });
        return result;
    }
}