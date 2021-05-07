import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './procurement-lot-status-new-update-dialog.component.html',
    styleUrls: ['./procurement-lot-status-new-update-dialog.component.scss']
})
export class AigProcurementLotStatusNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigProcurementLotStatusNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
