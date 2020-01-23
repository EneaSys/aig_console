import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';

export const aigGenericRoute: Routes = [
    {
        path: 'aig-generic',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'city/list'
            },
            {
                path: 'city',
                children: [
                    /*
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