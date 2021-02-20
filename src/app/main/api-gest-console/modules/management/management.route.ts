import { Routes } from "@angular/router";
import { ContextModuleResolver } from "aig-common/modules/standard/resolver/context-module.resolver";

import { AigApplicationModuleResolver } from "aig-common/modules/management/resolver/application-module.resolver";
import { AigEntityReferenceResolver } from "aig-common/modules/management/resolver/entity-reference.resolver";
import { AigTenantContextResolver } from "aig-common/modules/management/resolver/tenant-context.resolver";
import { RoleSystemResolver } from "aig-common/old-common/resolver/role-system.resolver";
import { AuthGuardService } from "auth/auth-guard.service";
import { AigApplicationModuleDetailPageComponent } from "./components/application-module-detail-page/application-module-detail-page.component";
import { AigApplicationModuleListPageComponent } from "./components/application-module-list-page/application-module-list-page.component";
import { AigContextListPageComponent } from "./components/context-list-page/context-list-page.component";
import { AigContextModuleDetailPageComponent } from "./components/context-module-detail-page/context-module-detail-page.component";
import { AigContextModuleListPageComponent } from "./components/context-module-list-page/context-module-list-page-component";
import { AigEntityReferenceDetailPageComponent } from "./components/entity-reference-detail-page/entity-reference-detail-page.component";
import { AigEntityReferenceListPageComponent } from "./components/entity-reference-list-page/entity-reference-list-page.component";
import { AigPermissionListPageComponent } from "./components/permission-list-page/permission-list-page.component";
import { AigRoleDetailPageComponent } from "./components/role-detail-page/role-page-detail.component";
import { AigRoleListPageComponent } from "./components/role-list-page/role-list-page.component";
import { AigTenantContextDetailPageComponent } from "./components/tenant-context-detail-page/tenant-context-detail-page.component";
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
                            role: AigRoleSystemResolver,
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
                    {
                        path: 'detail/:id',
                        component: AigPermissionListPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: AigPermissionSystemResolver,
                        },
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
                    {
                        path: 'detail/:id',
                        component: AigContextModuleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            contextModule: AigContextModuleResolver,
                        },
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
					{
                        path: 'detail/:id',
                        component: AigTenantContextDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            tenantContext: AigTenantContextResolver,
                        },
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
                    },
                    {
                        path: 'detail/:id',
                        component: AigApplicationModuleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            applicationModule: AigApplicationModuleResolver,
                        },
                    },
                
                ]
            },
            {
                path: 'entity-reference',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigEntityReferenceListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigEntityReferenceDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            entityReference: AigEntityReferenceResolver,
                        },
                    },
                
                ]
            },
		]
	}
]