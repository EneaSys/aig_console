import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { UserResourceService, UserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-users-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigUserTableComponent implements OnInit {
    constructor(
        private userResourceService: UserResourceService,
        private _snackBar: MatSnackBar,
        private router: Router,
    ) { }

    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    private disactivate(userCode: string):void {
        this.userResourceService.deactivateUserUsingDELETE(userCode).subscribe(
            (userDTO: UserDTO) => {
                console.log("Ricarica la linea con: ", userDTO);
                this._snackBar.open("User Deactivated", null, {duration: 2000,});
            },
            (error: any) => {
                console.log("ERR" + error);
                this._snackBar.open("User not Deactivated: " + error, null, {duration: 2000,});
            }
        );
    }

    private reactivate(userCode: string):void {
        this.userResourceService.reactivateUserUsingPUT(userCode).subscribe(
            (userDTO: UserDTO) => {
                console.log("Ricarica la linea con: ", userDTO);
                this._snackBar.open("User Reactivated", null, {duration: 2000,});
            }
        );
    }

    userDetail(userCode: String) {
        this.router.navigate(['iam', 'user', userCode]);
    }
}
