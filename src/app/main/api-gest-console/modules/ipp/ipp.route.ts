import { Routes } from '@angular/router';
import { DesignatedCompanyResolver } from 'aig-common/modules/ipp/resolver/designated-company.resolver';
import { DossierResolver } from 'aig-common/modules/ipp/resolver/dossier.resolver';
import { InsurancePolicyStatusResolver } from 'aig-common/modules/ipp/resolver/insurance-policy-status.resolver';
import { InsurancePolicyResolver } from 'aig-common/modules/ipp/resolver/insurance-policy.resolver';
import { PartecipationStatusResolver } from 'aig-common/modules/ipp/resolver/partecipation-status.resolver';
import { PartecipationResolver } from 'aig-common/modules/ipp/resolver/partecipation.resolver';
import { PreparationStatusResolver } from 'aig-common/modules/ipp/resolver/preparation-status.resolver';
import { PreparationResolver } from 'aig-common/modules/ipp/resolver/preparation.resolver';
import { ProcurementLotResolver } from 'aig-common/modules/ipp/resolver/procurement-lot.resolver';
import { ProcurementResolver } from 'aig-common/modules/ipp/resolver/procurement.resolver';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigDesignatedCompanyDetailPageComponent } from './components/designated-company-detail-page/designated-company-detail-page.component';
import { AigDesignatedCompanyListPageComponent } from './components/designated-company-list-page/designated-company-list-page.component';
import { AigDossierDetailPageComponent } from './components/dossier-detail-page/dossier-detail-page.component';
import { AigDossierListPageComponent } from './components/dossier-list-page/dossier-list-page.component';
import { AigInsurancePolicyDetailPageComponent } from './components/insurance-policy-detail-page/insurance-policy-detail-page.component';
import { AigInsurancePolicyListPageComponent } from './components/insurance-policy-list-page/insurance-policy-list-page.component';
import { AigInsurancePolicyStatusDetailPageComponent } from './components/insurance-policy-status-detail-page/insurance-policy-status-detail-page.component';
import { AigInsurancePolicyStatusListPageComponent } from './components/insurance-policy-status-list-page/insurance-policy-status-list-page.component';
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
                            procurement:  ProcurementResolver,
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
                           procurementLot: ProcurementLotResolver,
                        },
                    },
                ]
            },

            {
                path: 'insurance-policy-status',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigInsurancePolicyStatusListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigInsurancePolicyStatusDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            insurancePolicyStatus:  InsurancePolicyStatusResolver,
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
                path: 'designated-company',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigDesignatedCompanyListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigDesignatedCompanyDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            designetedCompany: DesignatedCompanyResolver,
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
                        resolve: {
                            partecipation: PartecipationResolver,
                        },
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
                        resolve: {
                            partecipationStatus: PartecipationStatusResolver,
                        },
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
                        resolve: {
                            preparation: PreparationResolver,
                        },
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
                        resolve: {
                            preparationStatus: PreparationStatusResolver,
                        },
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
                        resolve: {
                            insurancePolicy: InsurancePolicyResolver,
                        },
                    },
                ]
            },

        ]
    }
]