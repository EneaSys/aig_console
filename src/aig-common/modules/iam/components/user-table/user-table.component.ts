import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextUserDTO, UserDTO, UserResourceService } from 'aig-entity-manager';
import { AigUserService } from '../../services/form/user.service';
 
@Component({
    selector: 'aig-users-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigUserTableComponent implements OnInit, OnDestroy {
    constructor(
		private aigUserService: AigUserService,
		private userResourceService: UserResourceService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private eventService: EventService,
        
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
 
    subscriptions: Subscription[] = [];

    ngOnInit(): void { }

	async reload(user: ContextUserDTO) {
		await this.aigUserService.reloadPermissions(user.userCode).toPromise();
	}

    async disactivate(user: ContextUserDTO) {
		try {
			let userDTO: UserDTO = await this.userResourceService.deactivateUserUsingDELETE(user.userCode).toPromise();
			this.eventService.reloadCurrentPage();
			this._snackBar.open("User Deactivated", null, {duration: 2000,});	
		} catch (error) {
			this._snackBar.open("User not Deactivated: " + error, null, {duration: 2000,});
		}
    }

    reactivate(user: ContextUserDTO):void {
        var reactivateUserSubscription = this.userResourceService.reactivateUserUsingPUT(user.userCode).subscribe(
            (userDTO: UserDTO) => {
                this.eventService.reloadCurrentPage();
                this._snackBar.open("User Reactivated", null, {duration: 2000,});
            }
        );

        this.subscriptions.push(reactivateUserSubscription);
    }

    userDetail(user: ContextUserDTO) {
        this.router.navigate(['iam', 'user', user.id]);
    }

    
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
    


   


}



