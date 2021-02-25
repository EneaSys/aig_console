import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './purchase-new-update-dialog.component.html',
    styleUrls: ['./purchase-new-update-dialog.component.scss']
})
export class AigPurchaseNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPurchaseNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    
   
    ngOnInit(): void {

     }
}