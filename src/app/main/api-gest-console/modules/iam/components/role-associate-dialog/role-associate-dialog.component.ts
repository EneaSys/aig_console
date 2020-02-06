import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'aig-role-associate-dialog',
    templateUrl: './role-associate-dialog.component.html',
    styleUrls: ['./role-associate-dialog.component.scss']
})
export class AigRoleAssociateNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigRoleAssociateNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
