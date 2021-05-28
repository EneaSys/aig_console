import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'aig-generic-eopoo-new-update-dialog',
    templateUrl: './generic-eopoo-new-update-dialog.component.html',
    styleUrls: ['./generic-eopoo-new-update-dialog.component.scss']
})
export class AigGenericEopooNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigGenericEopooNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}