import { NgModule } from '@angular/core';
import { AuthModule } from 'auth/auth.module';

import { EventManagerModule } from './event-manager/event-manager.module';
import { AigContextBrowserRepositoryModule } from './context-browser-repository/context-browser-repository.module';

@NgModule({
    declarations: [ ],
    imports: [
        AuthModule,

        EventManagerModule,

        AigContextBrowserRepositoryModule,
    ],
    exports: [ ],
    providers: [ ],
})
export class AigCommonModule {}