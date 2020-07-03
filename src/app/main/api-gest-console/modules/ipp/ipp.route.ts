import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigIppLotListPageComponent } from './components/ipp-lot-list-page/ipp-lot-list-page.component';
import { AigIppListPageComponent } from './components/ipp-list-page/ipp-list-page.component';

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
                        component: AigIppListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigIppListPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                      //      eopoo: EopooResolver,
                        },
                    },
                ]
            },
            {
                path: 'lot',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigIppLotListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigIppLotListPageComponent,
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