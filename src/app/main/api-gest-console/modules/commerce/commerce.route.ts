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
import { AigCatalogListPageComponent } from './components/catalog-list-page/catalog-list-page.component';
import { AigCatalogDetailPageComponent } from './components/catalog-detail-page/catalog-detail-page.component';
import { AigCatalogResolver } from 'aig-common/modules/commerce/resolver/catalog.resolver';
import { AigFiscalTransactionListPageComponent } from './components/fiscal-transaction-list-page/fiscal-transaction-list-page.component';
import { AigInventoryItemCombinationListPageComponent } from './components/inventory-item-combination-list-page/inventory-item-combination-list-page.component';
import { AigPriceListListPageComponent } from './components/price-list-list-page/price-list-list-page.component';
import { AigPriceListDetailPageComponent } from './components/price-list-detail-page/price-list-detail-page.component';
import { AigPriceListResolver } from 'aig-common/modules/commerce/resolver/price-list.resolver';
import { AigCatalogManagerPageComponent } from './components/catalog-manager-page/catalog-manager-page.component';
import { AigCatalogItemListPageComponent } from './components/catalog-item-list-page/catalog-item-list-page.component';
import { AigCatalogItemDetailPageComponent } from './components/catalog-item-detail-page/catalog-item-detail-page.component';
import { AigCatalogItemResolver } from 'aig-common/modules/commerce/resolver/catalog-item.resolver';
import { AigPriceListItemListPageComponent } from './components/price-list-item-list-page/price-list-item-list-page.component';

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
            {
                path: 'catalog',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component:  AigCatalogListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }, 
                    {
                        path: 'detail/:id',
                        component: AigCatalogDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            catalog: AigCatalogResolver,
                        },
                    }
                ]
            },
            {
                path: 'price-list',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component:  AigPriceListListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }, 
                    {
                        path: 'detail/:id',
                        component: AigPriceListDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            priceList: AigPriceListResolver,
                        },
                    }
                ]
            },
            {
                path: 'price-list-item',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component:  AigPriceListItemListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }, 
                    /*{
                        path: 'detail/:id',
                        component: AigPriceListDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            priceList: AigPriceListResolver,
                        },
                    }*/
                ]
            },
            {
                path: 'catalog-manager',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component:  AigCatalogManagerPageComponent,
                        canActivate: [ AuthGuardService ],
                    }, 
                    /*{
                        path: 'detail/:id',
                        component: AigPriceListDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            priceList: AigPriceListResolver,
                        },
                    }*/
                ]
            },
            {
                path: 'catalog-item',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component:  AigCatalogItemListPageComponent,
                        canActivate: [ AuthGuardService ],
                    }, 
                    {
                        path: 'detail/:id',
                        component: AigCatalogItemDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            catalogItem: AigCatalogItemResolver,
                        },
                    }
                ]
            },
        ]
    }
]