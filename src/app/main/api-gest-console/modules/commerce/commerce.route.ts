import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigSellerListPageComponent } from './components/seller-list-page/seller-list-page.component';
import { AigPurchaseDetailPageComponent } from './components/purchase-detail-page/purchase-detail-page.component';
import { PurchaseResolver } from 'aig-common/modules/commerce/resolver/purchase.resolver';
import { AigFiscalTransactionDetailPageComponent } from './components/fiscal-transaction-detail-page/fiscal-transaction-detail-page.component';
import { FiscalTransactionResolver } from 'aig-common/modules/commerce/resolver/fiscal-transaction.resolver';
import { AigBuyerDetailPageComponent } from './components/buyer-detail-page/buyer-detail-page.component';
import { BuyerResolver } from 'aig-common/modules/commerce/resolver/buyer.resolver';
import { ValidateBuyerPageComponent } from './components/validate-buyer-page/validate-buyer-page.component';
import { ValidateFiscalTransactionPageComponent } from './components/validate-fiscal-transaction-page/validate-fiscal-transaction-page.component';
import { AigBuyerListPageComponent } from './components/buyer-list-page/buyer-list-page.component';
import { AigInventoryItemListPageComponent } from './components/inventory-item-list-page/inventory-item-list-page.component';
import { AigProducerListPageComponent } from './components/producer-list-page/producer-list-page.component';
import { AigInventoryCategoryListPageComponent } from './components/inventory-category-list-page/inventory-category-list-page.component';
import { AigWarehouseListPageComponent } from './components/warehouse-list-page/warehouse-list-page.component';
import { AigInventoryCategoryDetailPageComponent } from './components/inventory-category-detail-page/inventory-category-detail-page.component';
import { AigInventoryCategoryResolver } from 'aig-common/modules/commerce/resolver/inventory-category.resolver';
import { AigInventoryItemDetailPageComponent } from './components/inventory-item-detail-page/inventory-item-detail-page.component';
import { AigInventoryItemResolver } from 'aig-common/modules/commerce/resolver/inventory-item-resolver';
import { AigProducerDetailPageComponent } from './components/producer-detail-page/producer-detail-page.component';
import { AigProducerResolver } from 'aig-common/modules/commerce/resolver/producer.resolver';
import { AigWarehouseDetailPageComponent } from './components/warehouse-detail-page/warehouse-detail-page.component';
import { AigWarehouseResolver } from 'aig-common/modules/commerce/resolver/warehouse.resolver';
import { AigWarehouseHandlingListPageComponent } from './components/warehouse-handling-list-page/warehouse-handling-list-page.component';
import { AigWarehouseHandlingDetailPageComponent } from './components/warehouse-handling-detail-page/warehouse-handling-detail-page.component.ts/warehouse-handling-detail-page.component';
import { AigWarehouseHandlingResolver } from 'aig-common/modules/commerce/resolver/warehouse-handling.resolver';
import { AigWarehouseManagerPageComponent } from './components/warehouse-manager-page/warehouse-manager-page.component';
import { AigSellerDetailPageComponent } from './components/seller-detail-page/seller-detail-page.component';
import { AigSellerResolver } from 'aig-common/modules/commerce/resolver/seller.resolver';
import { AigFiscalTransactionListPageComponent } from './components/fiscal-transaction-list-page/fiscal-transaction-list-page.component';
import { AigInventoryItemCombinationListPageComponent } from './components/inventory-item-combination-list-page/inventory-item-combination-list-page.component';
import { AigPurchaseListPageComponent } from './components/purchase-list-page/purchase-list-page.component';
import { AigPurchaseItemListPageComponent } from './components/purchase-item-list-page/purchase-item-list-page.component';
import { AigWarehouseHandlingItemListPageComponent } from './components/warehouse-handling-item-list-page/warehouse-handling-item-list-page.component';
import { AigPurchaseItemDetailPageComponent } from './components/purchase-item-detail-page/purchase-item-detail-page.component';
import { PurchaseItemResolver } from 'aig-common/modules/commerce/resolver/purchase-item.resolver';

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
                    {
                        path: 'detail/:id',
                        component: AigSellerDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            seller: AigSellerResolver,
                        },
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
                        component: AigPurchaseListPageComponent,
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
                path: 'purchase-item',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigPurchaseItemListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    
        
                    {
                        path: 'detail/:id',
                        component: AigPurchaseItemDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            purchase: PurchaseItemResolver,
                        },
                    },
                ]
            },
            {
                path: 'producer',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigProducerListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigProducerDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            producer: AigProducerResolver,
                        },
                    },
                ]
            },
            {
                path: 'warehouse-handling',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigWarehouseHandlingListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigWarehouseHandlingDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            warehouseHandling: AigWarehouseHandlingResolver,
                        },
                    },
                ] 
            },
            {
                path: 'warehouse-manager',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'manager'
                    },
                    {
                        path: 'manager',
                        component: AigWarehouseManagerPageComponent,
                        canActivate: [ AuthGuardService ],
                    }
                ] 
            },
            {
                path: 'warehouse-handling-item',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigWarehouseHandlingItemListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }
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
                        component: AigFiscalTransactionListPageComponent,
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
                    {
                        path: 'detail/:id',
                        component: AigInventoryItemDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            inventoryItem: AigInventoryItemResolver,
                        },
                    },
                ]
            },
            {
                path: 'inventory-item-combination',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigInventoryItemCombinationListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigInventoryItemDetailPageComponent, //QUESTA NON E' LA PAGINA DEI DETTAGLI DELLA COMBINAZIONE
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            inventoryItem: AigInventoryItemResolver,
                        },
                    },
                ]
            },
            {
                path: 'warehouse',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigWarehouseListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigWarehouseDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            warehouse: AigWarehouseResolver,
                        },
                    },
                ]
            },
            {
                path: 'inventory-category',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component:  AigInventoryCategoryListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }, 
                    {
                        path: 'detail/:id',
                        component: AigInventoryCategoryDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            inventoryCategory: AigInventoryCategoryResolver,
                        },
                    }
                ]
            },
        ]
    }
]