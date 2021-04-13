import { Routes } from '@angular/router';
import { DossierResolver } from 'aig-common/modules/ipp/components/resolver/dossier.resolver';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigDossierDetailPageComponent } from './components/dossier-detail-page/dossier-detail-page.component';
import { AigDossierListPageComponent } from './components/dossier-list-page/dossier-list-page.component';
import { AigPartecipationDetailPageComponent } from './components/partecipation-detail-page/partecipation-detail-page.component';
import { AigPartecipationListPageComponent } from './components/partecipation-list-page/partecipation-list-page.component';
import { AigProcurementDetailPageComponent } from './components/procurement-detail-page/procurement-detail-page.component';
import { AigProcurementLotDetailPageComponent } from './components/procurement-lot-detail-page/procurement-lot-detail-page.component';
import { AigProcurementLotListPageComponent } from './components/procurement-lot-list-page/procurement-lot-list-page.component';
import { AigProcurementListPageComponent } from './procurement-list-page/procurement-list-page.component';


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
            

        ]
    }
]