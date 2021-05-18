import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './procurement-new-update-dialog.component.html',
    styleUrls: ['./procurement-new-update-dialog.component.scss']
})
export class AigProcurementNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigProcurementNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}