import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './purchase-complex-dialog.component.html',
    styleUrls: ['./purchase-complex-dialog.component.scss']
})
export class AigPurchaseComplexDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPurchaseComplexDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
