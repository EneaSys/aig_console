import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContextGroupDTO, UserDTO, RoleDTO } from 'api-gest';

@Component({
    selector: 'aig-role-associate-dialog',
    templateUrl: './role-associate-dialog.component.html',
    styleUrls: ['./role-associate-dialog.component.scss']
})
export class AigRoleAssociateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigRoleAssociateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public role: RoleDTO;
    public group: ContextGroupDTO;
    public user: UserDTO;

    ngOnInit(): void {
        this.role = this.data.role;
        this.group = this.data.group;
        this.user = this.data.user;
    }
}
