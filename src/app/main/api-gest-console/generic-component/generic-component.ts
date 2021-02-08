import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AigGenericComponentService } from './generic-component.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

export class GenericComponent implements OnInit, OnDestroy {
    constructor(
        private _gcs: AigGenericComponentService,
    ) { }
    protected _destructors: Subscription[] = [];
	protected firstLoad: boolean = true;
	
    ngOnInit(): void {
        this.loadComponent();
        this._loadPage();

        var destructor = this._gcs.eventService.reloadPage$.subscribe(() => { this.loadComponent(); this._loadPage(); });
        this._destructors.push(destructor);

        this._gcs.fuseSplashScreenService.hide();

        this.firstLoad = false;
    }

    ngOnDestroy(): void {
        this.destroyComponent();
        this.destroyPage();

        this._destructors.forEach(destructor => { destructor.unsubscribe(); });
    }

    // deprecated
    loadComponent() { }

    // deprecated
    destroyComponent() { }

    loadPage() { }

    reloadPage() { }

    afterLoad() { }

    destroyPage() { }

    private _loadPage() {
        if(this.firstLoad) {
            this.loadPage();
        } else {
            this.reloadPage();
		}
        this.afterLoad();
    }





    toggleSidebar(name: string): void {
        this._gcs.fuseSidebarService.getSidebar(name).toggleOpen();
    }
}