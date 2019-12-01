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
import { AigGroupListComponent } from './modules/iam/components/group-list/group-list.component';
import { RoleSystemResolver } from './modules/_common/resolver/role-system.resolver';
import { RoleCustomResolver } from './modules/_common/resolver/role-custom.resolver';
import { AigUserDetailComponent } from './modules/iam/components/user-detail/user-detail.component';
import { UserResolver } from './modules/_common/resolver/user.resolver';
import { AigGroupDetailComponent } from './modules/iam/components/group-detail/group-detail.component';
import { GroupResolver } from './modules/_common/resolver/group.resolver';
import { AigCustomRolePageComponent } from './modules/iam/components/custom-role-page/custom-role-page.component';
import { AigRoleDetailPageComponent } from './modules/management/components/role-detail-page/role-page-detail.component';
import { AigPermissionListPageComponent } from './modules/management/components/permission-list-page/permission-list-page.component';
import { AigRoleListPageComponent } from './modules/management/components/role-list-page/role-list-page.component';
import { AigContextListPageComponent } from './modules/management/components/context-list-page/context-list-page.component';
import { AigRoleCustomDetailComponent } from './modules/iam/components/custom-role-custom-detail/custom-role-custom-detail.component';

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
                        redirectTo: 'list',
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
                    },
                    {
                        path: ':id',
                        component: AigGroupDetailComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            group: GroupResolver,
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
                        component: AigCustomRolePageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigRoleCustomDetailComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            roleCustom: RoleCustomResolver,
                        },
                    },
                ]
            },
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
                            roleSystem: RoleSystemResolver
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
        ]
    },
];