import { Injectable } from '@angular/core';
import { FuseNavigation, FuseNavigationItem } from '@fuse/types';
import { UserPermissionMemoryResourceService } from 'api-gest';
import { navigation } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { AigContextRepositoryService } from 'aig-common/context-browser-repository/context-browser-repository.service';

@Injectable()
export class AigModuleNavigationService {
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private userPermissionMemoryResourceService: UserPermissionMemoryResourceService,
        private aigContextRepositoryService: AigContextRepositoryService,
    ) {
        this.aigContextRepositoryService.getCurrentContextObservable().subscribe(
            (context) => {
                if(this.currentContextLoaded != context) {
                    this.reloadNavigation();
                    this.currentContextLoaded = context;
                }
            }
        );
    }
    private currentContextLoaded = null;

    private navigation: FuseNavigation[];
    private userPermissions: string[];

    reloadNavigation() {
        var id = Math.random().toString(36).substring(2, 15);
        this._loadNavigation(id);
    }

    private async _loadNavigation(navigationId: string) {
        try {
            // controlla se loggato e se contesto settato
            var permissions: string[] = await this.userPermissionMemoryResourceService.getUserPermission().toPromise();
            // potrei aggiungere anche permessi da jwt ad esempio i roles
            this.userPermissions = permissions;
    
            this.navigation = [];
            navigation.forEach((value: FuseNavigation) => {
                this.examineItem(value);
            })
    
            this._fuseNavigationService.register(navigationId, this.navigation);
            this._fuseNavigationService.setCurrentNavigation(navigationId);
        } catch (e) { }
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

        if ((navigationItem.type == 'group' || navigationItem.type == 'collapsable') && savedChild > 0) {
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