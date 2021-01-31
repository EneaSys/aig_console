import { Routes } from "@angular/router";
import { RoleSystemResolver } from "aig-common/old-common/resolver/role-system.resolver";
import { AuthGuardService } from "auth/auth-guard.service";
import { AigApplicationModuleListPageComponent } from "./components/application-module-list-page/application-module-list-page.component";
import { AigContextListPageComponent } from "./components/context-list-page/context-list-page.component";
import { AigContextModuleListPageComponent } from "./components/context-module-list-page/context-module-list-page-component";
import { AigPermissionListPageComponent } from "./components/permission-list-page/permission-list-page.component";
import { AigRoleDetailPageComponent } from "./components/role-detail-page/role-page-detail.component";
import { AigRoleListPageComponent } from "./components/role-list-page/role-list-page.component";
import { AigTenantContextListPageComponent } from "./components/tenant-context-list-page/tenant-context-list-page.component";

export const managementRoute: Routes = [
    {
        path: 'm8t',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'context/list'
            },
            {
                path: 'context',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigContextListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }
                ]
            },
           
            {
                path: 'role',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigRoleListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                ]
            },
            {
                path: 'permission',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigPermissionListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                ]
            },
            {
                path: 'context-module',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigContextModuleListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                ]
            },
			{
                path: 'tenant-context',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigTenantContextListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                ]
            },
            {
                path: 'application-module',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigApplicationModuleListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }
                ]
            },
		]
	}
]