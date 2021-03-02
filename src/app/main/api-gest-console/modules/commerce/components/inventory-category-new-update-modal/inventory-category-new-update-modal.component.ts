import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './inventory-category-new-update-modal.component.html',
    styleUrls: ['./inventory-category-new-update-modal.component.scss']
})
export class AigInventoryCategoryNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigInventoryCategoryNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}