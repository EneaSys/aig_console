import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { ApiGestConsoleModule } from './main/api-gest-console/api-gest-console.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { BASE_PATH } from 'api-gest';
import { API_URL } from './app.constants';
import { AigApolloDocumentModule } from './main/api-gest-console/modules/apollo-document/apollo-document.module';
import { AigEopooModule } from './main/api-gest-console/modules/eopoo/eopoo.module';
import { AigIamModule } from './main/api-gest-console/modules/iam/iam.module';
import { AigManagementModule } from './main/api-gest-console/modules/management/management.module';

import { AigCommonModule } from 'aig-common/common.module';
import { AuthInterceptor } from 'aig-common/auth.interceptor';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'sample'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        LayoutModule,

        // Serve per interceptor
        AigCommonModule,

        // Serve per i route
        ApiGestConsoleModule,

        // App modules
        AigApolloDocumentModule,
        AigEopooModule,

        AigIamModule,
        AigManagementModule,



        SampleModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        { 
            provide: BASE_PATH,
            useValue: API_URL
        },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
