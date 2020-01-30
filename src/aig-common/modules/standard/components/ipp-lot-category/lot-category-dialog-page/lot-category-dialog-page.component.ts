import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './lot-category-dialog-page.component.html',
    styleUrls: ['./lot-category-dialog-page.component.scss']
})
export class AigLotCategoryDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigLotCategoryDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
