import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { UserResourceService, UserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-users-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigUserTableComponent implements OnInit, OnDestroy {
    constructor(
        private userResourceService: UserResourceService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private eventService: EventService,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    subscriptions: Subscription[] = [];

    ngOnInit(): void { }

    disactivate(userCode: string):void {
        var deactivateUserSubscription = this.userResourceService.deactivateUserUsingDELETE(userCode).subscribe(
            (userDTO: UserDTO) => {
                this.eventService.reloadCurrentPage();
                this._snackBar.open("User Deactivated", null, {duration: 2000,});
            },
            (error: any) => {
                this._snackBar.open("User not Deactivated: " + error, null, {duration: 2000,});
            }
        );

        this.subscriptions.push(deactivateUserSubscription);
    }

    reactivate(userCode: string):void {
        var reactivateUserSubscription = this.userResourceService.reactivateUserUsingPUT(userCode).subscribe(
            (userDTO: UserDTO) => {
                this.eventService.reloadCurrentPage();
                this._snackBar.open("User Reactivated", null, {duration: 2000,});
            }
        );

        this.subscriptions.push(reactivateUserSubscription);
    }

    userDetail(userCode: String) {
        this.router.navigate(['iam', 'user', userCode]);
    }

    
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}
