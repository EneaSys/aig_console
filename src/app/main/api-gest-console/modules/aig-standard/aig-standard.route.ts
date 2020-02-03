import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';
import { AigCpvListPageComponent } from './components/cpv-list-page/cpv-list-page.component';
import { AigIppLotTypeListPageComponent } from './components/ipp-lot-type-list-page/ipp-lot-type-list-page.component';
import { AigIppModalityListPageComponent } from './components/ipp-modality-list-page/ipp-modality-list-page.component';
import { AigIppProcedureListPageComponent } from './components/ipp-procedure-list-page/ipp-procedure-list-page.component';
import { AigIppSectorListPageComponent } from './components/ipp-sector-list-page/ipp-sector-list-page.component';
import { AigSocialActionListPageComponent } from './components/social-action-list-page/social-action-list-page.component';
import { AigIppLotCategoryListPageComponent } from './components/ipp-lot-category-list-page/ipp-lot-category-list-page.component';
import { AigSocialListPageComponent } from './components/social-list-page/social-list-page.component';
import { CityResolver } from 'aig-common/old-common/services/city.resolver';
import { CityService } from 'aig-common/old-common/services/city.service';
import { RoleSystemResolver } from 'aig-common/old-common/resolver/role-system.resolver';
import { AigCityDetailPageComponent } from './components/city-detail-page/city-detail-page.component';
import { AigSocialDetailPageComponent } from './components/social-detail-page/social-detail-page.component';
import { AigLotCategoryDetailPageComponent } from './components/ipp-lot-category-detail-page/lot-category-detail-page.component';
import { AigIppLotTypeDetailPageComponent } from './components/ipp-lot-type-detail-page/ipp-lot-type-detail-page.component';
import { AigIppModalityDetailPageComponent } from './components/ipp-modality-detail-page/ipp-modality-detail-page.component';
import { AigIppProcedureDetailPageComponent } from './components/ipp-procedure-detail-page/ipp-procedure-detail-page.component';
import { AigIppSectorDetailPageComponent } from './components/ipp-sector-detail-page/ipp-sector-detail-page.component';
import { AigSocialActionDetailPageComponent } from './components/social-action-detail/social-action-detail.component';
import { AigRoleDetailPageComponent } from '../management/components/role-detail-page/role-page-detail.component';
import { SocialResolver } from 'aig-common/modules/standard/resolver/social.resolver';
import { ActionResolver } from 'aig-common/modules/standard/resolver/social-action.resolver';
import { SectorResolver } from 'aig-common/modules/standard/resolver/sector.resolver';
import { IppProcedureResolver } from 'aig-common/modules/standard/resolver/procedure.resolver';
import { LotResolver } from 'aig-common/modules/standard/resolver/lot.resolver';
import { IppModalityResolver } from 'aig-common/modules/standard/resolver/ipp-modality.resolver';
import { CategoryResolver } from 'aig-common/modules/standard/resolver/category.resolver';

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
                            city: CityResolver,
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
                    
                    {
                        path: 'detail/:id',
                        component: AigSocialDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            social: SocialResolver,
                        },
                    },
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
                    {
                        path: 'detail/:id',
                        component: AigSocialActionDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            socialaction: ActionResolver,
                        },
                    },
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
                        component: AigCpvDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            cpv: CpvResolver,
                        },
                    },*/
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
                    {
                        path: 'detail/:id',
                        component: AigIppModalityDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            ippModality: IppModalityResolver,
                        },
                    },
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
                    {
                        path: 'detail/:id',
                        component: AigIppProcedureDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            procedure: IppProcedureResolver,
                        },
                    },
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
                    {
                        path: 'detail/:id',
                        component: AigIppSectorDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            sector: SectorResolver,
                        },
                    },
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
                    {
                        path: 'detail/:id',
                        component: AigIppLotTypeDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            lottype: LotResolver,
                        },
                    },
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
                    {
                        path: 'detail/:id',
                        component: AigLotCategoryDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            category: CategoryResolver,
                        },
                    },
                ]
            },
        ]
    }
];