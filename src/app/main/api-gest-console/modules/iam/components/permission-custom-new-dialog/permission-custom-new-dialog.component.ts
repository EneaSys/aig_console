import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomRoleDTO } from 'api-gest';

@Component({
    templateUrl: './permission-custom-new-dialog.component.html',
    styleUrls: ['./permission-custom-new-dialog.component.scss']
})
export class AigPermissionCustomNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPermissionCustomNewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}
