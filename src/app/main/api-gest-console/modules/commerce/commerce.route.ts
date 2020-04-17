import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigSellerManagerPageComponent } from './components/seller-manager-page/seller-manager-page.component';

export const commerceRoute: Routes = [
    {
        path: 'commerce',
        children: [
            {
                path: 'seller-manager',
                component: AigSellerManagerPageComponent,
                canActivate: [ AuthGuardService ],
            },
            /**
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'buy/list'
            },
            {
                path: 'buy',
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
                        component: AigProcurementListPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                      //      eopoo: EopooResolver,
                        },
                    },
                ]
            },
            */
        ]
    }
]