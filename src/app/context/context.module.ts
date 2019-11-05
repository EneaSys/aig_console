import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigContextRepositoryService } from './context-repository.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ApiGestModule, BASE_PATH } from 'api-gest';
import { HttpClientModule } from '@angular/common/http';
import { API_URL } from 'app/app.constants';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgxWebstorageModule.forRoot(),

        ApiGestModule,
        HttpClientModule,
    ],
    exports: [
        
    ],
    providers: [
        AigContextRepositoryService,
        { provide: BASE_PATH,  useValue: API_URL },
    ],
})
export class AigContextModule {}