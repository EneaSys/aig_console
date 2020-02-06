import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AigGenericComponentService } from './generic-component.service';

export class GenericComponent implements OnInit, OnDestroy {
    constructor(
        private _gcs: AigGenericComponentService,
    ) { }
    protected _destructors: Subscription[] = [];
    protected firstLoad = true;

    ngOnInit(): void {
        this.loadComponent();
        this._loadPage();

        var destructor = this._gcs.eventService.reloadPage$.subscribe(() => { this.loadComponent(); this._loadPage(); });
        this._destructors.push(destructor);

        this.firstLoad = false

        this._gcs.fuseSplashScreenService.hide();

        this.firstLoad = false
    }

    ngOnDestroy(): void {
        this.destroyComponent();

        this._destructors.forEach(destructor => { destructor.unsubscribe(); });
    }

    loadComponent() { }

    destroyComponent() { }

    loadPage() { }

    reloadPage() { }

    private _loadPage() {
        if(this.firstLoad) {
            this.loadPage();
        } else {
            this.reloadPage();
        }
    }
}