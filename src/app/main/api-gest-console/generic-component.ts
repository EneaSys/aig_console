import { OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'aig-common/event-manager/event.service';
import { Subscription } from 'rxjs';

export class GenericComponent implements OnInit, OnDestroy {
    constructor(
        protected eventService: EventService,
    ) { }
    protected _destructors: Subscription[] = [];

    ngOnInit(): void {
        this.loadComponent();

        var destructor = this.eventService.reloadPage$.subscribe(() => { this.loadComponent(); });
        this._destructors.push(destructor);
    }

    ngOnDestroy(): void {
        this.destroyComponent();

        this._destructors.forEach(destructor => { destructor.unsubscribe(); });
    }

    loadComponent() { }

    destroyComponent() { }
}