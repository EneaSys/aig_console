import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './procurement-lot-category-new-update-dialog.component.html',
    styleUrls: ['./procurement-lot-category-new-update-dialog.component.scss']
})
export class AigProcurementLotCategoryNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigProcurementLotCategoryNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}