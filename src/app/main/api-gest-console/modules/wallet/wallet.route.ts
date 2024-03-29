import { Routes } from "@angular/router";
import { TransactionResolver } from "aig-common/modules/wallet/resolver/transaction.resolver";
import { WalletResolver } from "aig-common/modules/wallet/resolver/wallet.resolver";
import { AuthGuardService } from "auth/auth-guard.service";
import { AigCreditCardListPageComponent } from "./components/credit-card-list-page/credit-card-list-page.component";
import { AigMerchantListPageComponent } from "./components/merchant-list-page/merchant-list-page.component";
import { AigTransactionDetailPageComponent } from "./components/transaction-detail-page/transaction-detail-page.component";
import { AigTransactionListPageComponent } from "./components/transaction-list-page/transaction-list-page.component";
import { AigWalletDetailPageComponent } from "./components/wallet-detail-page/wallet-detail-page.component";
import { AigWalletListPageComponent } from "./components/wallet-list-page/wallet-list-page.component";

export const walletRoute: Routes = [
    {
        path: 'wallet',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'wallet/list'
            },
			{
                path: 'wallet',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigWalletListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
					{
                        path: 'detail/:id',
                        component: AigWalletDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            wallet:  WalletResolver,
                        },
                    },
                ]
            },
			{
                path: 'credit-card',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigCreditCardListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
					/*
					{
                        path: 'detail/:id',
                        component: AigWalletDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            wallet:  WalletResolver,
                        },
                    },
					*/
                ]
            },
            {
                path: 'merchant',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigMerchantListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
					{
                        path: 'detail/:id',
                        component: AigProcurementDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            //merchant:  ProcurementResolver,
                        },
                    },
					*/
                ]
            },

			{
                path: 'transaction',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigTransactionListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    
					{
                        path: 'detail/:id',
                        component: AigTransactionDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            transaction:  TransactionResolver,
                        },
                    },
					
                ]
            },
		]
	}
];