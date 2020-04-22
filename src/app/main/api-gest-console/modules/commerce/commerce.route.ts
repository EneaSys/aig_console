import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigSellerManagerPageComponent } from './components/seller-manager-page/seller-manager-page.component';
import { AigSellerListPageComponent } from './components/seller-list-page/seller-list-page.component';

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
                        component: AigProcurementListPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            eopoo: EopooResolver,
                        },
                    },
                    */
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