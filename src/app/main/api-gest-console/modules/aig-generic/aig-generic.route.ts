import { Routes } from '@angular/router';
import { AuthGuardService } from 'auth/auth-guard.service';
import { AigEopooListPageComponent } from './components/eopoo-list-page/eopoo-list-page.component';
import { AigEopooTypeListPageComponent } from './components/eopoo-type-list-page/eopoo-type-list-page.component';
import { EopooTypeResolver } from 'aig-common/modules/generic/resolver/eopoo-type.resolver';
import { AigEopooTypeDetailPageComponent } from './components/eopoo-type-detail-page/eopoo-type-detail-page.component';
import { EopooResolver } from 'aig-common/modules/generic/resolver/eopoo.resolver';
import { AigEopooDetailPageComponent } from './components/eopoo-detail-page/eopoo-detail-page.component';
import { AigGenericEopooListPageComponent } from './components/generic-eopoo-list-page/generic-eopoo-list-page.component';
import { AigAddressListPageComponent } from './components/address-list-page/address-list-page.component';
import { AigReferentListPageComponent } from './components/referent-list-page/referent-list-page.component';
import { AigContactListPageComponent } from './components/contact-list-page/contact-list-page.component';
import { AigAddressDetailPageComponent } from './components/address-detail-page/address-detail-page.component';
import { AddressResolver } from 'aig-common/modules/generic/resolver/address.resolver';
import { AigReferentDetailPageComponent } from './components/referent-detail-page/referent-detail-page.component';
import { ReferentResolver } from 'aig-common/modules/generic/resolver/referent.resolver';
import { AigContactDetailPageComponent } from './components/contact-detail-page/contact-detail-page.component';
import { ContactResolver } from 'aig-common/modules/generic/resolver/contact.resolver';
import { AigFormTypeListPageComponent } from './components/form-type-list-page/form-type-list-page.component';
import { AigFormDataListPageComponent } from './components/form-data-list-page/form-data-list-page.component';
import { AigFormDataDetailPageComponent } from './components/form-data-detail-page/form-data-detail-page.component';
import { FormDataResolver } from 'aig-common/modules/generic/resolver/form-data.resolver';
import { AigFormDataDetailPage3Component } from './components/form-data-detail-page-3/form-data-detail-page-3.component';
import { AigFormDataDetailPage2Component } from './components/form-data-detail-page-2/form-data-detail-page-2.component';
import { AigFormDataDetailPage4Component } from './components/form-data-detail-page-4/form-data-detail-page-4.component';

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
                    {
                        path: 'detail/:id',
                        component: AigEopooDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            eopoo: EopooResolver,
                        },
                    },
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

			{
                path: 'form-type',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigFormTypeListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*{
                        path: 'detail/:id',
                        component: AigEopooTypeDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            eopooType: EopooTypeResolver,
                        },
                    },
					*/
                ]
            },

			{
                path: 'form-data',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigFormDataListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigFormDataDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            formData: FormDataResolver,
                        },
                    },
					{
                        path: 'detail-2/:id',
                        component: AigFormDataDetailPage2Component,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            formData: FormDataResolver,
                        },
                    },
					{
                        path: 'detail-3/:id',
                        component: AigFormDataDetailPage3Component,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            formData: FormDataResolver,
                        },
                    },
					{
                        path: 'detail-4/:id',
                        component: AigFormDataDetailPage4Component,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            formData: FormDataResolver,
                        },
                    },
				
                ]
            },
            {
                path: 'generic-eopoo',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigGenericEopooListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    /*{
                        path: 'detail/:id',
                        component: AigEopooTypeDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            eopooType: EopooTypeResolver,
                        },
                    },*/
                ]
            },
            {
                path: 'address',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigAddressListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigAddressDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            address: AddressResolver,
                        },
                    },
                ]
            },
            {
                path: 'referent',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigReferentListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigReferentDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            referent: ReferentResolver,
                        },
                    },
                ]
            },
            {
                path: 'contact',
                children: [
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: AigContactListPageComponent,
                        canActivate: [ AuthGuardService ],
                    },
                    {
                        path: 'detail/:id',
                        component: AigContactDetailPageComponent,
                        canActivate: [ AuthGuardService ],
                        resolve: {
                            contact: ContactResolver,
                        },
                    },
                ]
            },
        ]
    }
];