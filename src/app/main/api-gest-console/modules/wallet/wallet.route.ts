import { Routes } from "@angular/router";
import { AuthGuardService } from "auth/auth-guard.service";
import { AigMerchantListPageComponent } from "./components/merchant-list-page/merchant-list-page.component";

export const walletRoute: Routes = [
    {
        path: 'wallet',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'merchant/list'
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
		]
	}
];