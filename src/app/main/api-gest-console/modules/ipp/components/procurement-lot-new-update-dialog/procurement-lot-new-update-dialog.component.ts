import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './procurement-lot-new-update-dialog.component.html',
    styleUrls: ['./procurement-lot-new-update-dialog.component.scss']
})
export class AigProcurementLotNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigProcurementLotNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    
   
    ngOnInit(): void {

     }
}