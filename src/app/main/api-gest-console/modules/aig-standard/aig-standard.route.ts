import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigCityListPageComponent } from './components/city-list-page/city-list-page.component';

export const aigStandardRoute: Routes = [
    {
        path: 's6d',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'city/list'
            },
            {
                path: 'city',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigCityListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*
                    {
                        path: 'detail/:id',
                        component: AigRoleDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            role: RoleSystemResolver,
                        },
                    },
                    */
                ]
            },
        ]
    }
];