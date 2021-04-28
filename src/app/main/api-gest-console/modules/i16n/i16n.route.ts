import { Routes } from '@angular/router';
import { DettaglioPagamentoResolver } from 'aig-common/modules/i16n/resolver/dettaglio-pagamento.resolver';
import { FatturaElettronicaBodyResolver } from 'aig-common/modules/i16n/resolver/fattura-elettronica-body.resolver';
import { InsurancePolicyResolver } from 'aig-common/modules/ipp/resolver/insurance-policy.resolver';
import { ProcurementLotResolver } from 'aig-common/modules/ipp/resolver/procurement-lot.resolver';
import { ProcurementResolver } from 'aig-common/modules/ipp/resolver/procurement.resolver';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigInsurancePolicyDetailPageComponent } from '../ipp/components/insurance-policy-detail-page/insurance-policy-detail-page.component';
import { AigProcurementLotDetailPageComponent } from '../ipp/components/procurement-lot-detail-page/procurement-lot-detail-page.component';
import { AigDatiPagamentoListPageComponent } from './components/dati-pagamento-list-page/dati-pagamento-list-page.component';
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
                        component: AigProcurementLotDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                           procurementLot: ProcurementLotResolver,
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
        ]
    }
]