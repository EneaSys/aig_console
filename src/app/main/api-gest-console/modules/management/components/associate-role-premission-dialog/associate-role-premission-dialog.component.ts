import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './associate-role-premission-dialog.component.html',
    styleUrls: ['./associate-role-premission-dialog.component.scss']
})
export class AigAssociateRoleToPermissionNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigAssociateRoleToPermissionNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}
