import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './lot-category-dialog-page.component.html',
    styleUrls: ['./lot-category-dialog-page.component.scss']
})
export class AigLotCategoryDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigLotCategoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
