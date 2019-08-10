import { Routes } from '@angular/router';
import { EopooListComponent } from './components/eopoo/eopoo-list/eopoo-list.component';
import { EopooNewComponent } from './components/eopoo/eopoo-new/eopoo-new.component';
import { EopooTypeResolver } from './services/eopoo-type.resolver';
import { CityResolver } from './services/city.resolver';
import { EopooDetailComponent } from './components/eopoo/eopoo-detail/eopoo-detail.component';

export const apiGestRoute: Routes = [{
    path: 'api-gest',
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'eopoo'
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
                    component: EopooListComponent
                },
                {
                    path: 'new',
                    component: EopooNewComponent,
                    resolve: {
                        eopooType: EopooTypeResolver,
                        city: CityResolver
                    }
                },
                {
                    path: 'detail/:id',
                    component: EopooDetailComponent,
                    resolve: {
                        eopooType: EopooTypeResolver,
                        city: CityResolver
                    }
                }
            ]
        },
        
    ]
}];