import { Routes } from '@angular/router';
import { DossierResolver } from 'aig-common/modules/ipp/resolver/dossier.resolver';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigDossierDetailPageComponent } from './components/dossier-detail-page/dossier-detail-page.component';
import { AigDossierListPageComponent } from './components/dossier-list-page/dossier-list-page.component';
import { AigInsurancePolicyDetailPageComponent } from './components/insurance-policy-detail-page/insurance-policy-detail-page.component';
import { AigInsurancePolicyListPageComponent } from './components/insurance-policy-list-page/insurance-policy-list-page.component';
import { AigPartecipationDetailPageComponent } from './components/partecipation-detail-page/partecipation-detail-page.component';
import { AigPartecipationListPageComponent } from './components/partecipation-list-page/partecipation-list-page.component';
import { AigPartecipationStatusDetailPageComponent } from './components/partecipation-status-detail-page/partecipation-status-detail-page.component';
import { AigPartecipationStatusListPageComponent } from './components/partecipation-status-list-page/partecipation-status-list-page.component';
import { AigPreparationDetailPageComponent } from './components/preparation-detail-page/preparation-detail-page.component';
import { AigPreparationListPageComponent } from './components/preparation-list-page/preparation-list-page.component';
import { AigPreparationStatusDetailPageComponent } from './components/preparation-status-detail-page/preparation-status-detail-page.component';
import { AigPreparationStatusListPageComponent } from './components/preparation-status-list-page/preparation-status-list-page.component';
import { AigProcurementDetailPageComponent } from './components/procurement-detail-page/procurement-detail-page.component';
import { AigProcurementListPageComponent } from './components/procurement-list-page/procurement-list-page.component';
import { AigProcurementLotDetailPageComponent } from './components/procurement-lot-detail-page/procurement-lot-detail-page.component';
import { AigProcurementLotListPageComponent } from './components/procurement-lot-list-page/procurement-lot-list-page.component';



export const ippRoute: Routes = [
    {
        path: 'ipp',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'procurement/list'
            },
            {
                path: 'procurement',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigProcurementListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigProcurementDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                      //      eopoo: EopooResolver,
                        },
                    },
                ]
            },
            {
                path: 'procurement-lot',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigProcurementLotListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigProcurementLotDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                      //      eopoo: EopooResolver,
                        },
                    },
                ]
            },

            {
                path: 'dossier',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigDossierListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigDossierDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            dossier: DossierResolver,
                        },
                    },
                ]
            },

            {
                path: 'partecipation',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigPartecipationListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigPartecipationDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        /*resolve: {
                            dossier: DossierResolver,
                        },*/
                    },
                ]
            },
            {
                path: 'partecipation-status',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigPartecipationStatusListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigPartecipationStatusDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        /*resolve: {
                            dossier: DossierResolver,
                        },*/
                    },
                ]
            },
            {
                path: 'preparation',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigPreparationListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigPreparationDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        /*resolve: {
                            dossier: DossierResolver,
                        },*/
                    },
                ]
            },
            {
                path: 'preparation-status',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigPreparationStatusListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigPreparationStatusDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        /*resolve: {
                            dossier: DossierResolver,
                        },*/
                    },
                ]
            },
            {
                path: 'insurance-policy',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigInsurancePolicyListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigInsurancePolicyDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        /*resolve: {
                            dossier: DossierResolver,
                        },*/
                    },
                ]
            },

        ]
    }
]