import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './lot-category-new-update-modal.component.html',
    styleUrls: ['./lot-category-new-update-modal.component.scss']
})
export class AigLotCategoryNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigLotCategoryNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
