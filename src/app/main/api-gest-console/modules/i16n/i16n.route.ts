import { Routes } from '@angular/router';
import { InsurancePolicyResolver } from 'aig-common/modules/ipp/resolver/insurance-policy.resolver';
import { ProcurementLotResolver } from 'aig-common/modules/ipp/resolver/procurement-lot.resolver';
import { ProcurementResolver } from 'aig-common/modules/ipp/resolver/procurement.resolver';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigDettaglioPagamentoListPageComponent } from './components/dettaglio-pagamento-list-page/dettaglio-pagamento-list-page.component';





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
                        component: AigDettaglioPagamentoListPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            procurement:  ProcurementResolver,
                        },
                    },
                ]
            },/*
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
*/
        ]
    }
]