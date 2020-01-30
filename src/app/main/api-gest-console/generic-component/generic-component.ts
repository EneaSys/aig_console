import { OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'aig-common/event-manager/event.service';
import { Subscription } from 'rxjs';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { AigGenericComponentService } from './generic-component.service';

export class GenericComponent implements OnInit, OnDestroy {
    constructor(
        private _gcs: AigGenericComponentService,
    ) { }
    protected _destructors: Subscription[] = [];

    ngOnInit(): void {
        this.loadComponent();

        var destructor = this._gcs.eventService.reloadPage$.subscribe(() => { this.loadComponent(); });
        this._destructors.push(destructor);

        this._gcs.fuseSplashScreenService.hide();
    }

    ngOnDestroy(): void {
        this.destroyComponent();

        this._destructors.forEach(destructor => { destructor.unsubscribe(); });
    }

    loadComponent() { }

    destroyComponent() { }
}