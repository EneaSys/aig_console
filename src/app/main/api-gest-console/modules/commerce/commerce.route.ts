import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigSellerManagerPageComponent } from './components/seller-manager-page/seller-manager-page.component';
import { AigSellerListPageComponent } from './components/seller-list-page/seller-list-page.component';
import { AigPurchaseDetailPageComponent } from './components/purchase-detail-page/purchase-detail-page.component';
import { PurchaseResolver } from 'aig-common/modules/commerce/resolver/purchase.resolver';
import { AigFiscalTransactionDetailPageComponent } from './components/fiscal-transaction-detail-page/fiscal-transaction-detail-page.component';
import { FiscalTransactionResolver } from 'aig-common/modules/commerce/resolver/fiscal-transaction.resolver';

export const commerceRoute: Routes = [
    {
        path: 'commerce',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'seller/list'
            },
            {
                path: 'seller',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigSellerListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigPurchaseDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            //eopoo: EopooResolver,
                        },
                    },
                    */
                ]
            },
            {
                path: 'purchase',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigSellerListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigPurchaseDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            purchase: PurchaseResolver,
                        },
                    },
                ]
            },
            {
                path: 'fiscal-transaction',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigSellerListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigFiscalTransactionDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            fiscalTransaction: FiscalTransactionResolver,
                        },
                    },
                ]
            },
            {
                path: 'seller-manager',
                component: AigSellerManagerPageComponent,
                canActivate: [ AuthGuardService ],
            },
        ]
    }
]