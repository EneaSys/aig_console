import { Routes } from "@angular/router";
import { AigApplicationModuleResolver } from "aig-common/modules/management/resolver/application-module.resolver";
import { AigContextModuleResolver } from "aig-common/modules/management/resolver/context-module.resolver";
import { AigContextUserResolver } from "aig-common/modules/management/resolver/context-user.resolver";
import { AigEntityReferenceResolver } from "aig-common/modules/management/resolver/entity-reference.resolver";
import { AigPermissionResolver } from "aig-common/modules/management/resolver/permission.resolver";
import { AigPersonalizationResolver } from "aig-common/modules/management/resolver/personalization.resolver";
import { AigRoleResolver } from "aig-common/modules/management/resolver/role.resolver";
import { AigTenantContextResolver } from "aig-common/modules/management/resolver/tenant-context.resolver";
import { AuthGuardService } from "auth/auth-guard.service";
import { AigApplicationModuleDetailPageComponent } from "./components/application-module-detail-page/application-module-detail-page.component";
import { AigApplicationModuleListPageComponent } from "./components/application-module-list-page/application-module-list-page.component";
import { AigContextModuleDetailPageComponent } from "./components/context-module-detail-page/context-module-detail-page.component";
import { AigContextModuleListPageComponent } from "./components/context-module-list-page/context-module-list-page.component";
import { AigContextUserDetailPageComponent } from "./components/context-user-detail-page/context-user-detail-page.component";
import { AigContextUserListPageComponent } from "./components/context-user-list-page/context-list-page.component";
import { AigEntityReferenceDetailPageComponent } from "./components/entity-reference-detail-page/entity-reference-detail-page.component";
import { AigEntityReferenceListPageComponent } from "./components/entity-reference-list-page/entity-reference-list-page.component";
import { AigPermissionDetailPageComponent } from "./components/permission-detail-page/permission-detail-page.component";
import { AigPermissionListPageComponent } from "./components/permission-list-page/permission-list-page.component";
import { AigPersonalizationDetailPageComponent } from "./components/personalization-detail-page/personalization-detail-page.component";
import { AigPersonalizationListPageComponent } from "./components/personalization-list-page/personalization-list-page.component";
import { AigRoleDetailPageComponent } from "./components/role-detail-page/role-detail-page.component";
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
                path: 'context-user',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigContextUserListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigContextUserDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            contextUser: AigContextUserResolver,
                        },
                    },
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
                            role: AigRoleResolver,
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
                        component: AigPermissionDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            permission: AigPermissionResolver,
                        },
                    },
                ]
            },
            {
                path: 'personalization',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigPersonalizationListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigPersonalizationDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            permission: AigPersonalizationResolver,
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