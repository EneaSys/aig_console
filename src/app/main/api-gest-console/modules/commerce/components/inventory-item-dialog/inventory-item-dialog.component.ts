import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './inventory-item-dialog.component.html',
    styleUrls: ['./inventory-item-dialog.component.scss']
})
export class AigInventoryItemDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigInventoryItemDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
    ) { }

    
   
    ngOnInit(): void {

     }
}
