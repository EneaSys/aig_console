import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigSolidarityRequestListPageComponent } from './components/solidarity-request-list-page/solidarity-request-list-page.component';
import { AigSolidarityRequestDetailPageComponent } from './components/solidarity-request-detail-page/solidarity-request-detail-page.component';
import { HelpRequestResolver } from 'aig-common/modules/solidarity/resolver/help-request.resolver';
import { AigSolidarityDashboardComponent } from './components/solidarity-dashboard-page/solidarity-dashboard-page.component';

export const solidarityRoute: Routes = [
    {
        path: 'solidarity',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: AigSolidarityDashboardComponent,
                canActivate: [ AuthGuardService ],
            },
            {
                path: 'request',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigSolidarityRequestListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigSolidarityRequestDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            helpRequest: HelpRequestResolver,
                        },
                    },
                ]
            },
        ]
    }
]