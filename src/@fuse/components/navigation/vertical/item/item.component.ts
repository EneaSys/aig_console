import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationItem } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { IContext } from 'aig-common/context-browser-repository/Context.model';
import { AigContextRepositoryService } from 'aig-common/context-browser-repository/context-browser-repository.service';

@Component({
    selector: 'fuse-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class FuseNavVerticalItemComponent implements OnInit, OnDestroy {
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: FuseNavigationItem;

    // Private
    private _unsubscribeAll: Subject<any>;

    $context: Observable<IContext>;

    /**
     * Constructor
     */

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private aigContextRepositoryService: AigContextRepositoryService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            this.$context = this.aigContextRepositoryService.getCurrentContextObservable();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
