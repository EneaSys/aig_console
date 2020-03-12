import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigProcurementListPageComponent } from './components/procurement-list-page/procurement-list-page.component';

export const ippRoute: Routes = [
    {
        path: 'ipp',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'procurement/list'
            },
            {
                path: 'procurement',
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
        ]
    }
]