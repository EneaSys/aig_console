import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigSellerManagerPageComponent } from './components/seller-manager-page/seller-manager-page.component';
import { AigSellerListPageComponent } from './components/seller-list-page/seller-list-page.component';
import { AigPurchaseDetailPageComponent } from './components/purchase-detail-page/purchase-detail-page.component';
import { PurchaseResolver } from 'aig-common/modules/commerce/resolver/purchase.resolver';
import { AigFiscalTransactionDetailPageComponent } from './components/fiscal-transaction-detail-page/fiscal-transaction-detail-page.component';
import { FiscalTransactionResolver } from 'aig-common/modules/commerce/resolver/fiscal-transaction.resolver';
import { AigBuyerDetailPageComponent } from './components/buyer-detail-page/buyer-detail-page.component';
import { BuyerResolver } from 'aig-common/modules/commerce/resolver/buyer.resolver';
import { AigCommValidatorPageComponent } from './components/validator-page/validator-page.component';
import { ValidateBuyerPageComponent } from './components/validate-buyer-page/validate-buyer-page.component';
import { ValidateFiscalTransactionPageComponent } from './components/validate-fiscal-transaction-page/validate-fiscal-transaction-page.component';
import { AigBuyerListPageComponent } from './components/buyer-list-page/buyer-list-page.component';
import { AigInventoryItemListPageComponent } from './components/inventory-item-list-page/inventory-item-list-page.component';

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
                path: 'buyer',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigBuyerListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigBuyerDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            buyer: BuyerResolver,
                        },
                    },
                    {
                        path: 'detail/:id/validate',
                        component: ValidateBuyerPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            buyer: BuyerResolver,
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
                    {
                        path: 'detail/:id/validate',
                        component: ValidateFiscalTransactionPageComponent,
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
            {
                path: 'validator',
                component: AigCommValidatorPageComponent,
                canActivate: [ AuthGuardService ],
            },

            {
                path: 'inventory-item',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigInventoryItemListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*{
                        path: 'detail/:id',
                        component: AigPurchaseDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            purchase: PurchaseResolver,
                        },
                    */ 
                ]
            },
        ]
    }
]