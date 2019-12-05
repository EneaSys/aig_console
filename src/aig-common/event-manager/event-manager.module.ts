import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from './event.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [
        EventService,
    ],
})
export class EventManagerModule {}