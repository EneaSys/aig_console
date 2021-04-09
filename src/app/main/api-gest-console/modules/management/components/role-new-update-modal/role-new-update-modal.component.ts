import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    templateUrl: './role-new-update-modal.component.html',
    styleUrls: ['./role-new-update-modal.component.scss']
})
export class AigRoleNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigRoleNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }
}
