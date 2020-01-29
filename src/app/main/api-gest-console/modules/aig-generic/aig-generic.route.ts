import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigEopooListPageComponent } from './components/eopoo-list-page/eopoo-list-page.component';
import { AigEopooTypeListPageComponent } from './components/eopoo-type-list-page/eopoo-type-list-page.component';
import { EopooTypeResolver } from 'aig-common/modules/generic/resolver/eopoo-type.resolver';
import { AigEopooTypeDetailPageComponent } from './components/eopoo-type-detail-page/eopoo-type-detail-page.component';

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
            {
                path: 'eopoo-type',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigEopooTypeListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigEopooTypeDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            eopooType: EopooTypeResolver,
                        },
                    },
                ]
            },
        ]
    }
];