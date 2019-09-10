import { Routes } from '@angular/router';
import { EopooTypeResolver } from './modules/_common/services/eopoo-type.resolver';
import { CityResolver } from './modules/_common/services/city.resolver';
import { AuthGuardService } from 'app/auth/auth-guard.service';
import { EopooListComponent } from './modules/eopoo/components/eopoo-list/eopoo-list.component';
import { EopooNewComponent } from './modules/eopoo/components/eopoo-new/eopoo-new.component';
import { EopooDetailComponent } from './modules/eopoo/components/eopoo-detail/eopoo-detail.component';
import { AigApolloDocumentListComponent } from './modules/apollo-document/component/apollo-document-list/apollo-document-list.component';
import { ApolloDocumentDetailComponent } from './modules/apollo-document/component/apollo-document-detail/apollo-document-detail.component';
import { ApolloDocumentResolver } from './modules/_common/services/apollo-document.resolver';
import { ApolloDocumentLineResolver } from './modules/_common/services/apollo-document-line.resolver';

export const apiGestRoute: Routes = [
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
                component: EopooListComponent,
                canActivate: [ AuthGuardService ],
            },
            {
                path: 'new',
                component: EopooNewComponent,
                canActivate: [ AuthGuardService ],
                resolve: {
                    eopooType: EopooTypeResolver,
                    city: CityResolver,
                },
            },
            {
                path: 'detail',
                redirectTo: 'list',
            },
            {
                path: 'detail/:id',
                component: EopooDetailComponent,
                canActivate: [ AuthGuardService ],
            }
        ]
    },
    {
        path: 'apollo-document',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: AigApolloDocumentListComponent,
                canActivate: [ AuthGuardService ],
            },
            {
                path: 'detail',
                redirectTo: 'list',
            },
            {
                path: 'detail/:id',
                component: ApolloDocumentDetailComponent,
                canActivate: [ AuthGuardService ],
                resolve: {
                    apolloDocument: ApolloDocumentResolver,
                    apolloDocumentLine: ApolloDocumentLineResolver,
                },
            }
        ]
    }
];