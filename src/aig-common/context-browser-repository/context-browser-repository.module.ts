import { NgModule } from '@angular/core';
import { AigContextRepositoryService } from './context-browser-repository.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ApiGestModule, BASE_PATH } from 'api-gest';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [ ],
    imports: [
        NgxWebstorageModule.forRoot(),

        ApiGestModule,
        HttpClientModule,
    ],
    exports: [ ],
    providers: [
        AigContextRepositoryService,
    ],
})
export class AigContextBrowserRepositoryModule {}