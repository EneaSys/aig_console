import { Routes } from '@angular/router';
import { EopooTypeResolver } from './modules/_common/services/eopoo-type.resolver';
import { CityResolver } from './modules/_common/services/city.resolver';
import { AuthGuardService } from 'app/auth/auth-guard.service';
import { EopooListComponent } from './modules/eopoo/components/eopoo-list/eopoo-list.component';
import { EopooNewComponent } from './modules/eopoo/components/eopoo-new/eopoo-new.component';
import { EopooDetailComponent } from './modules/eopoo/components/eopoo-detail/eopoo-detail.component';
import { AigApolloDocumentListComponent } from './modules/apollo-document/component/apollo-document-list/apollo-document-list.component';
import { ApolloDocumentDetailComponent } from './modules/apollo-document/component/apollo-document-detail/apollo-document-detail.component';
import { ApolloDocumentResolver } from './modules/_common/services/apollo-document.resolver';
import { ApolloDocumentLineResolver } from './modules/_common/services/apollo-document-line.resolver';
import { AigUserListComponent } from './modules/iam/components/user-list/user-list.component';
import { AigRoleListComponent } from './modules/iam/components/role/role-list.component';
import { AigGroupListComponent } from './modules/iam/components/group-list/group-list.component';
import { AigContextListComponent } from './modules/management/components/context-list/context-list.component';
import { AigRoleSystemDetailComponent } from './modules/iam/components/role-system-detail/role-system-detail.component';
import { AigRoleCustomDetailComponent } from './modules/iam/components/role-custom-detail/role-custom-detail.component';
import { RoleSystemResolver } from './modules/_common/resolver/role-system.resolver';
import { RoleCustomResolver } from './modules/_common/resolver/role-custom.resolver';
import { PermissionsRoleCustomResolver } from './modules/_common/resolver/permission-role-custom.resolver';
import { AigUserDetailComponent } from './modules/iam/components/user-detail/user-detail.component';
import { UserResolver } from './modules/_common/resolver/user.resolver';
import { AigPermissionListComponent } from './modules/iam/components/permission-list/permission-list.component';

export const apiGestRoute: Routes = [
    {
        path: 'eopoo',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: EopooListComponent,
                canActivate: [ AuthGuardService ],
            },
            {
                path: 'new',
                component: EopooNewComponent,
                canActivate: [ AuthGuardService ],
                resolve: {
                    eopooType: EopooTypeResolver,
                    city: CityResolver,
                },
            },
            {
                path: 'detail',
                redirectTo: 'list',
            },
            {
                path: 'detail/:id',
                component: EopooDetailComponent,
                canActivate: [ AuthGuardService ],
            }
        ]
    },
    {
        path: 'apollo-document',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: AigApolloDocumentListComponent,
                canActivate: [ AuthGuardService ],
            },
            {
                path: 'detail',
                redirectTo: 'list',
            },
            {
                path: 'detail/:id',
                component: ApolloDocumentDetailComponent,
                canActivate: [ AuthGuardService ],
                resolve: {
                    apolloDocument: ApolloDocumentResolver,
                    apolloDocumentLine: ApolloDocumentLineResolver,
                },
            }
        ]
    },
    {
        path: 'iam',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'user/list'
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigUserListComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: ':userCode',
                        component: AigUserDetailComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            user: UserResolver
                        },
                    },
                ]
            },
            {
                path: 'group',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigGroupListComponent,
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
                        component: AigRoleListComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/s/:id',
                        component: AigRoleSystemDetailComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            roleSystem: RoleSystemResolver
                        },
                    },
                    {
                        path: 'detail/c/:id',
                        component: AigRoleCustomDetailComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            roleCustom: RoleCustomResolver,
                            permissionsRoleCustom: PermissionsRoleCustomResolver,
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
                        component: AigPermissionListComponent,
                        canActivate: [ AuthGuardService ],
                    },
                ]
            }
        ]
    },
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
                        component: AigContextListComponent,
                        canActivate: [ AuthGuardService ],
                    }
                ]
            },
        ]
    },
];