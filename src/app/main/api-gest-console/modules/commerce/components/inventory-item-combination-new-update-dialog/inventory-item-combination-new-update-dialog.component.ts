import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './inventory-item-combination-new-update-dialog.component.html',
    styleUrls: ['./inventory-item-combination-new-update-dialog.component.scss']
})
export class AigInventoryItemCombinationNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigInventoryItemCombinationNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}