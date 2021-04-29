import { Routes } from '@angular/router';
import { AllegatiResolver } from 'aig-common/modules/i16n/resolver/allegati.resolver';
import { DatiPagamentoResolver } from 'aig-common/modules/i16n/resolver/dati-pagamento.resolver';
import { DatiVeicoliResolver } from 'aig-common/modules/i16n/resolver/dati-veicoli.resolver';
import { DettaglioPagamentoResolver } from 'aig-common/modules/i16n/resolver/dettaglio-pagamento.resolver';
import { FatturaElettronicaBodyResolver } from 'aig-common/modules/i16n/resolver/fattura-elettronica-body.resolver';
import { InsurancePolicyResolver } from 'aig-common/modules/ipp/resolver/insurance-policy.resolver';
import { ProcurementLotResolver } from 'aig-common/modules/ipp/resolver/procurement-lot.resolver';
import { ProcurementResolver } from 'aig-common/modules/ipp/resolver/procurement.resolver';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigInsurancePolicyDetailPageComponent } from '../ipp/components/insurance-policy-detail-page/insurance-policy-detail-page.component';
import { AigProcurementLotDetailPageComponent } from '../ipp/components/procurement-lot-detail-page/procurement-lot-detail-page.component';
import { AigAllegatiDetailPageComponent } from './components/allegati-detail-page/allegati-detail-page.component';
import { AigAllegatiListPageComponent } from './components/allegati-list-page/allegati-list-page.component';
import { AigDatiPagamentoDetailPageComponent } from './components/dati-pagamento-detail-page/dati-pagamento-detail-page.component';
import { AigDatiPagamentoListPageComponent } from './components/dati-pagamento-list-page/dati-pagamento-list-page.component';
import { AigDatiVeicoliDetailPageComponent } from './components/dati-veicoli-detail-page/dati-veicoli-detail-page.component';
import { AigDatiVeicoliListPageComponent } from './components/dati-veicoli-list-page/dati-veicoli-list-page.component';
import { AigDettaglioPagamentoDetailPageComponent } from './components/dettaglio-pagamento-detail-page/dettaglio-pagamento-detail-page.component';
import { AigDettaglioPagamentoListPageComponent } from './components/dettaglio-pagamento-list-page/dettaglio-pagamento-list-page.component';
import { AigFatturaElettronicaBodyListPageComponent } from './components/fattura-elettronica-body-list-page/fattura-elettronica-body-list-page.component';
import { AigFatturaElettronicaBodyDetailPageComponent } from './components/fattura-pagamento-body-detail-page/fattura-pagamento-body-detail-page.component';





export const i16nRoute: Routes = [
    {
        path: 'i16n',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dettaglio-pagamento/list'
            },
            {
                path: 'dettaglio-pagamento',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigDettaglioPagamentoListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigDettaglioPagamentoDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            dettaglioPagamento:  DettaglioPagamentoResolver,
                        },
                    },
                ]
            },
            {
                path: 'dati-pagamento',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigDatiPagamentoListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigDatiPagamentoDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                           datiPagamento: DatiPagamentoResolver,
                        },
                    },
                ]
            },
            {
                path: 'fattura-elettronica-body',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigFatturaElettronicaBodyListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigFatturaElettronicaBodyDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            fatturaElettronicaBody: FatturaElettronicaBodyResolver,
                        },
                    },
                ]
            },
            {
                path: 'dati-veicoli',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigDatiVeicoliListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigDatiVeicoliDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            datiVeicoli: DatiVeicoliResolver,
                        },
                    },
                ]
            },
            {
                path: 'allegati',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigAllegatiListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigAllegatiDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            allegati: AllegatiResolver,
                        },
                    },
                ]
            },
        ]
    }
]