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
import { AigCityDetailPageComponent } from '../../../../../aig-common/modules/standard/components/city/city-detail-page/city-detail-page.component';
import { CityResolver } from 'aig-common/old-common/services/city.resolver';
import { CityService } from 'aig-common/old-common/services/city.service';
import { RoleSystemResolver } from 'aig-common/old-common/resolver/role-system.resolver';
import { SocialResolver } from 'aig-common/old-common/services/social.resolver';
import { AigSocialDetailPageComponent } from 'aig-common/modules/standard/components/social/social-detail-page/social-detail-page.component';
import { AigSocialActionDetailPageComponent } from 'aig-common/modules/standard/components/social-action/social-action-detail/social-action-detail.component';
import { ActionResolver } from 'aig-common/old-common/services/social-action.resolver';
import { AigCpvDetailPageComponent } from 'aig-common/modules/standard/components/cpv/cpv-detail-page/cpv-detail-page.component';
import { CpvResolver } from 'aig-common/old-common/services/cpv.resolver';
import { AigIppModalityDetailPageComponent } from 'aig-common/modules/standard/components/ipp-modality/ipp-modality-detail-page/ipp-modality-detail-page.component';
import { IppModalityResolver } from 'aig-common/old-common/services/ipp-modality.resolver';
import { AigIppProcedureDetailPageComponent } from 'aig-common/modules/standard/components/ipp-procedure/ipp-procedure-detail-page/ipp-procedure-detail-page.component';
import { IppProcedureResolver } from 'aig-common/old-common/services/procedure.resolver';
import { AigIppSectorDetailPageComponent } from 'aig-common/modules/standard/components/ipp-sector/ipp-sector-detail-page/ipp-sector-detail-page.component';
import { SectorResolver } from 'aig-common/old-common/services/sector.resolver';
import { AigIppLotTypeDetailPageComponent } from 'aig-common/modules/standard/components/ipp-lot-type/ipp-lot-type-detail-page/ipp-lot-type-detail-page.component';
import { LotResolver } from 'aig-common/old-common/services/lot.resolver';
import { AigLotCategoryDetailPageComponent } from 'aig-common/modules/standard/components/ipp-lot-category/lot-category-detail-page/lot-category-detail-page.component';
import { CategoryResolver } from 'aig-common/old-common/services/category.resolver';

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
                    {
                        path: 'detail/:id',
                        component: AigCpvDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            cpv: CpvResolver,
                        },
                    },
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