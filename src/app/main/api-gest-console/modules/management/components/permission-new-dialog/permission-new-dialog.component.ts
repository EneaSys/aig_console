import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './permission-new-dialog.component.html',
    styleUrls: ['./permission-new-dialog.component.scss']
})
export class AigPermissionNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPermissionNewDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}
