import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigEopooListPageComponent } from './components/eopoo-list-page/eopoo-list-page.component';

export const aigGenericRoute: Routes = [
    {
        path: 'g5c',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'eopoo/list'
            },
            {
                path: 'eopoo',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigEopooListPageComponent,
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