import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';

import { AigSocialActionListPageComponent } from './components/social-action-list-page/social-action-list-page.component';
import { AigSocialListPageComponent } from './components/social-list-page/social-list-page.component';
import { AigSocialDetailPageComponent } from './components/social-detail-page/social-detail-page.component';
import { AigSocialActionDetailPageComponent } from './components/social-action-detail/social-action-detail.component';
import { AigCityDetailPageComponent } from './components/city-detail-page/city-detail-page.component';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';
import { AigCpvListPageComponent } from './components/cpv-list-page/cpv-list-page.component';
import { AigCpvDetailPageComponent } from './components/cpv-detail-page/cpv-detail-page.component';
import { AigIppLotTypeListPageComponent } from './components/ipp-lot-type-list-page/ipp-lot-type-list-page.component';
import { AigIppModalityListPageComponent } from './components/ipp-modality-list-page/ipp-modality-list-page.component';
import { AigIppProcedureListPageComponent } from './components/ipp-procedure-list-page/ipp-procedure-list-page.component';
import { AigIppSectorListPageComponent } from './components/ipp-sector-list-page/ipp-sector-list-page.component';
import { AigIppLotCategoryListPageComponent } from './components/ipp-lot-category-list-page/ipp-lot-category-list-page.component';
import { AigIppLotTypeDetailPageComponent } from './components/ipp-lot-type-detail-page/ipp-lot-type-detail-page.component';
import { AigIppModalityDetailPageComponent } from './components/ipp-modality-detail-page/ipp-modality-detail-page.component';
import { AigIppProcedureDetailPageComponent } from './components/ipp-procedure-detail-page/ipp-procedure-detail-page.component';
import { AigIppSectorDetailPageComponent } from './components/ipp-sector-detail-page/ipp-sector-detail-page.component';
import { AigLotCategoryDetailPageComponent } from './components/ipp-lot-category-detail-page/lot-category-detail-page.component';

import { SocialResolver } from 'aig-common/modules/standard/resolver/social.resolver';
import { CityResolver } from 'aig-common/modules/standard/resolver/city.resolver';
import { CityService } from 'aig-common/old-common/services/city.service';
import { CpvResolver } from 'aig-common/modules/standard/resolver/cpv.resolver';
import { ActionResolver } from 'aig-common/modules/standard/resolver/social-action.resolver';
import { SectorResolver } from 'aig-common/modules/standard/resolver/sector.resolver';
import { IppProcedureResolver } from 'aig-common/modules/standard/resolver/procedure.resolver';
import { LotResolver } from 'aig-common/modules/standard/resolver/lot.resolver';
import { IppModalityResolver } from 'aig-common/modules/standard/resolver/ipp-modality.resolver';
import { CategoryResolver } from 'aig-common/modules/standard/resolver/category.resolver';
import { RoleSystemResolver } from 'aig-common/old-common/resolver/role-system.resolver';
import { AigStandardCustomListPageComponent } from './components/standard-custom-list-page/standard-custom-list-page.component';
import { AigRegimeFiscaleListPageComponent } from './components/regime-fiscale-list-page/regime-fiscale-list-page.component';
import { AigRegimeFiscaleDetailPageComponent } from './components/regime-fiscale-detail-page/regime-fiscale-detail-page.component';
import { RegimeFiscaleResolver } from 'aig-common/modules/standard/resolver/regime-fiscale.resolver.ts/regime-fiscale.resolver';
import { AigTipoCassaListPageComponent } from './components/tipo-cassa-list-page/tipo-cassa-list-page.component';
import { AigTipoCassaDetailPageComponent } from './components/tipo-cassa-detail-page/tipo-cassa-detail-page.component';
import { TipoCassaResolver } from 'aig-common/modules/standard/resolver/tipo-cassa.resolver.ts/tipo-cassa.resolver';
import { AigNaturaListPageComponent } from './components/natura-list-page/natura-list-page.component';
import { NaturaResolver } from 'aig-common/modules/standard/resolver/natura.resolver.ts/natura.resolver';
import { AigNaturaDetailPageComponent } from './components/natura-detail-page/natura-detail-page.component';
import { AigTipoRitenutaListPageComponent } from './components/tipo-ritenuta-list-page/tipo-ritenuta-list-page.component';
import { AigTipoRitenutaDetailPageComponent } from './components/tipo-ritenuta-detail-page/tipo-ritenuta-detail-page.component';
import { TipoRitenutaResolver } from 'aig-common/modules/standard/resolver/tipo-ritenuta.resolver.ts/tipo-ritenuta.resolver';
import { AigTipoCessionePrestazioneListPageComponent } from './components/tipo-cessione-prestazione-list-page/tipo-cessione-prestazione-list-page.component';
import { AigTipoCessionePrestazioneDetailPageComponent } from './components/tipo-cessione-prestazione-detail-page/tipo-cessione-prestazione-detail-page.component';
import { TipoCessionePestazioneResolver } from 'aig-common/modules/standard/resolver/tipo-cessione-prestazione.resolver.ts/tipo-cessione-prestazione.resolver';

export const aigStandardRoute: Routes = [
    {
        path: 's6d',
        children: [
            {
                path: 'standard-custom',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigStandardCustomListPageComponent,
                        canActivate: [AuthGuardService],
                    },
                    /*{
                        path: 'detail/:id',
                        component: AigCityDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            city: CityResolver,
                        },
                    },*/
                ]
            },
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigCityDetailPageComponent,
                        canActivate: [AuthGuardService],
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
                        canActivate: [AuthGuardService],
                    },

                    {
                        path: 'detail/:id',
                        component: AigSocialDetailPageComponent,
                        canActivate: [AuthGuardService],
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigSocialActionDetailPageComponent,
                        canActivate: [AuthGuardService],
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigCpvDetailPageComponent,
                        canActivate: [AuthGuardService],
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigIppModalityDetailPageComponent,
                        canActivate: [AuthGuardService],
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigIppProcedureDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            ippProcedure: IppProcedureResolver,
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigIppSectorDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            ippSector: SectorResolver,
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigIppLotTypeDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            ippLotType: LotResolver,
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
                        canActivate: [AuthGuardService],
                    },
                    {
                        path: 'detail/:id',
                        component: AigLotCategoryDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            ippCategory: CategoryResolver,
                        },
                    },
                ],
            },
            {
                path: 'regime-fiscale',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigRegimeFiscaleListPageComponent,
                        canActivate: [AuthGuardService],
                    },

                    {
                        path: 'detail/:id',
                        component: AigRegimeFiscaleDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            regimeFiscale: RegimeFiscaleResolver,
                        },
                    },
                ]
            },
            {
                path: 'tipo-cassa',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigTipoCassaListPageComponent,
                        canActivate: [AuthGuardService],
                    },

                    {
                        path: 'detail/:id',
                        component: AigTipoCassaDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            tipoCassa: TipoCassaResolver,
                        },
                    },
                ]
            },
            {
                path: 'natura',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigNaturaListPageComponent,
                        canActivate: [AuthGuardService],
                    },

                    {
                        path: 'detail/:id',
                        component: AigNaturaDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            natura: NaturaResolver,
                        },
                    },
                ]
            },
            {
                path: 'tipo-ritenuta',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigTipoRitenutaListPageComponent,
                        canActivate: [AuthGuardService],
                    },

                    {
                        path: 'detail/:id',
                        component: AigTipoRitenutaDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            tipoRitenuta: TipoRitenutaResolver,
                        },
                    },
                ]
            },
            {
                path: 'tipo-cessione-prestazione',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigTipoCessionePrestazioneListPageComponent,
                        canActivate: [AuthGuardService],
                    },

                    {
                        path: 'detail/:id',
                        component: AigTipoCessionePrestazioneDetailPageComponent,
                        canActivate: [AuthGuardService],
                        resolve: {
                            tipoCessionePrestazione: TipoCessionePestazioneResolver,
                        },
                    },
                ]
            },

        ]
    },
]
