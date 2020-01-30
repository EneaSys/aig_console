import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';
import { AigCityDetailPageComponent } from './components/city-detail-page/city-detail-page.component';
import { AigCpvListPageComponent } from './components/cpv-list-page/cpv-list-page.component';
import { AigIppLotTypeListPageComponent } from './components/ipp-lot-type-list-page/ipp-lot-type-list-page.component';
import { AigIppModalityListPageComponent } from './components/ipp-modality-list-page/ipp-modality-list-page.component';
import { AigIppProcedureListPageComponent } from './components/ipp-procedure-list-page/ipp-procedure-list-page.component';
import { AigIppSectorListPageComponent } from './components/ipp-sector-list-page/ipp-sector-list-page.component';
import { AigSocialActionListPageComponent } from './components/social-action-list-page/social-action-list-page.component';
import { AigIppLotCategoryListPageComponent } from './components/ipp-lot-category-list-page/ipp-lot-category-list-page.component';
import { AigSocialListPageComponent } from './components/social-list-page/social-list-page.component';
import { CitySystemResolver } from 'aig-common/old-common/resolver/city-system.resolver';

export const aigStandardRoute: Routes = [
    {
        path: 's6d',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'city/list'
            },
            {
                path: 'city',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigCityListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigCityDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            city: CitySystemResolver,
                        },
                    },
                ]
            },
            {
                path: 'social',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigSocialListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'social-action',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigSocialActionListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'cpv',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigCpvListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'ipp-modality',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigIppModalityListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'ipp-procedure',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigIppProcedureListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'ipp-sector',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigIppSectorListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'ipp-lot-type',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigIppLotTypeListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'ipp-lot-category',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigIppLotCategoryListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
        ]
    }
];