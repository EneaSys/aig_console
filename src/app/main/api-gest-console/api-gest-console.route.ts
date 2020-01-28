import { Routes } from '@angular/router';
import { EopooListComponent } from './modules/eopoo/components/eopoo-list/eopoo-list.component';
import { EopooNewComponent } from './modules/eopoo/components/eopoo-new/eopoo-new.component';
import { EopooDetailComponent } from './modules/eopoo/components/eopoo-detail/eopoo-detail.component';
import { AigApolloDocumentListComponent } from './modules/apollo-document/component/apollo-document-list/apollo-document-list.component';
import { ApolloDocumentDetailComponent } from './modules/apollo-document/component/apollo-document-detail/apollo-document-detail.component';
import { AigUserListComponent } from './modules/iam/components/user-list/user-list.component';
import { AigGroupListComponent } from './modules/iam/components/group-list/group-list.component';
import { AigUserDetailComponent } from './modules/iam/components/user-detail/user-detail.component';
import { AigGroupDetailComponent } from './modules/iam/components/group-detail/group-detail.component';
import { AigCustomRolePageComponent } from './modules/iam/components/custom-role-page/custom-role-page.component';
import { AigRoleDetailPageComponent } from './modules/management/components/role-detail-page/role-page-detail.component';
import { AigPermissionListPageComponent } from './modules/management/components/permission-list-page/permission-list-page.component';
import { AigRoleListPageComponent } from './modules/management/components/role-list-page/role-list-page.component';
import { AigContextListPageComponent } from './modules/management/components/context-list-page/context-list-page.component';

import { AuthGuardService } from 'auth/auth-guard.service';

import { ApolloDocumentResolver } from 'aig-common/old-common/services/apollo-document.resolver';
import { ApolloDocumentLineResolver } from 'aig-common/old-common/services/apollo-document-line.resolver';
import { UserResolver } from 'aig-common/old-common/resolver/user.resolver';
import { GroupResolver } from 'aig-common/old-common/resolver/group.resolver';
import { RoleCustomResolver } from 'aig-common/old-common/resolver/role-custom.resolver';
import { RoleSystemResolver } from 'aig-common/old-common/resolver/role-system.resolver';
import { AigRoleCustomDetailComponent } from './modules/iam/components/custom-role-detail-page/custom-role-detail-page.component';


export const apiGestRoute: Routes = [
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
                            user: UserResolver,
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
        ]
    },
];